const AWS = require('aws-sdk');
// const {
//   REGION,
//   CHANNELS_TABLE_NAME,
//   STORAGE_URL,
//   VIDEOS_TABLE_NAME
// } = process.env;
const REGION = "eu-west-1";
const CHANNELS_TABLE_NAME = "live-shopping-channel";
const STORAGE_URL = "https://d34ferbfp3exdg.cloudfront.net";
const ddb = new AWS.DynamoDB();
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.customEventFromEventBridge = async (event) => {
    console.log("Stream State Change:", JSON.stringify(event, null, 2));
    const channel_id = event.detail.channel_name.slice(34);
    // console.log(event.detail.channel_name , channel_id);
    const params = {TableName: CHANNELS_TABLE_NAME, Key: {'id': {S: channel_id}}};
    const channel = await ddb.getItem(params).promise();
    

    if (event.detail.event_name == "Stream Start") {
      try {
        await _updateDDBChannelIsLive(true, channel_id);
        let selected_videotablename = "ivs-liveshopping-videotable-customer-" + channel_id;
        let result = await ddb.scan({ TableName: selected_videotablename }).promise();
        let videoItems = result.Items;
        videoItems.forEach(async (videoItem) => {
          if(videoItem.Current_Schedule.BOOL){
            ddb.updateItem({
              TableName: selected_videotablename,
              Key: {
                "id": {
                  S : videoItem.id.S
                }
              },
              UpdateExpression: 'set Current_Schedule = :update_current_schedule', 
              ExpressionAttributeValues: {
                ':update_current_schedule' : {
                  BOOL : true
                }
              }
            },
            function(err, data) {
               if (err) console.log(err, err.stack); // an error occurred
               else     console.log(data); 
            }
            );
            console.log("have done===========");
          }
        });
        return;
      } catch (err) {
        console.info("Stream Start>err:", err, err.stack);
        throw new Error(err);
      }
    }
  
    if (event.detail.event_name == "Stream End") {
      try {
        await _updateDDBChannelIsLive(false, channel_id);
        let selected_videotablename = "ivs-liveshopping-videotable-customer-" + channel_id;
        let result = await ddb.scan({ TableName: selected_videotablename }).promise();
        let videoItems = result.Items;
        videoItems.forEach(async (videoItem) => {
          if(videoItem.Current_Schedule.BOOL){
            ddb.updateItem({
              TableName: selected_videotablename,
              Key: {
                "id": {
                  S : videoItem.id.S
                }
              },
              UpdateExpression: 'set Current_Schedule = :update_current_schedule', 
              ExpressionAttributeValues: {
                ':update_current_schedule' : {
                  BOOL : false
                }
              }
            },
            function(err, data) {
               if (err) console.log(err, err.stack); // an error occurred
               else     console.log(data); 
            }
            );
            console.log("have done===========");
          }
        });
        return;
      } catch (err) {
        console.info("Stream End> err:", err, err.stack);
        throw new Error(err);
      }
    }
  
    if (event.detail.recording_status == "Recording End") {
      try {
        let payload = {
          id: event.detail.stream_id,
          channelName: event.detail.channel_name,
          length: msToTime(event.detail.recording_duration_ms),
          createOn: event.time,
          playbackUrl: `${STORAGE_URL}/${event.detail.recording_s3_key_prefix}/media/hls/master.m3u8`,
          viewers: channel.Item.Viewers.N,
          thumbnail: `${STORAGE_URL}/${event.detail.recording_s3_key_prefix}/media/thumbnails/thumb0.jpg`,
          thumbnails: [
            `${STORAGE_URL}/${event.detail.recording_s3_key_prefix}/media/thumbnails/thumb0.jpg`,
            `${STORAGE_URL}/${event.detail.recording_s3_key_prefix}/media/thumbnails/thumb1.jpg`,
            `${STORAGE_URL}/${event.detail.recording_s3_key_prefix}/media/thumbnails/thumb2.jpg`,
          ]
        };
        await _createDdbVideo(payload , channel_id);
        return;
      } catch (err) {
        console.info("Recording End > err:", err, err.stack);
        throw new Error(err);
      }
    }
    return;
};
const _createDdbVideo = async (payload , customerName) => {
    try {
      const result = await ddb.putItem({
        TableName: "ivs-liveshopping-videotable-customer-" + customerName,
        Item: {
          'id' : { S : new Date().valueOf().toString()},
          'StreamId': { S: payload.id }, 
          // 'Channel': { S: payload.channelName },
          'CreatedOn': { S: payload.createOn },
          'PlaybackUrl': { S: payload.playbackUrl },
          'Viewers': { N: payload.viewers },
          'Length': { S: payload.length },
          'CurrentThumbnail': { S: payload.thumbnail },
          'Thumbnails': { SS: payload.thumbnails },
          'Title' : { S: '' },
          'SubTitle': { S: '' },
          'Scheduled_date' : { S: '' },
          'Scheduled_time' :  { S: '' },
          'Scheduled_video_host' : { S: '' },
          'ChatSetting' :  { BOOL: true },
          'ReplaySetting' :  { BOOL: true },
          'HitcounterSetting' :  { BOOL: true },
          'AllowreplaySetting' : {BOOL : true },
          'SourceType' :  { S: '' },
          'Source' :  { S: '' },
          'Productions' :  { S: '' },
          'Scheduled_Statu' : {BOOL : false},
          'Current_Schedule' : {BOOL : false},
        }
      }).promise();
      return result;
    } catch (err) {
      console.info("_createDdbVideo > err:", err, err.stack);
      throw new Error(err);
    }
  };
const _updateDDBChannelIsLive = async (isLive, id, stream) => {
    try {
      const params = {
        TableName: CHANNELS_TABLE_NAME,
        Key: {
          'id': {
            S: id
          }
        },
        ExpressionAttributeNames: {'#IsLive': 'channel_islive','#ChannelStatus': 'ChannelStatus','#Viewers': 'Viewers'},
        ExpressionAttributeValues: {
          ':isLive': { BOOL: isLive},
          ':channelStatus': { S: stream ? JSON.stringify(stream) : '{}'},
          ':viewers': { N: stream ? String(stream.viewerCount) : String(0)}
        },
        UpdateExpression: 'SET #IsLive = :isLive, #ChannelStatus = :channelStatus, #Viewers = :viewers',
        ReturnValues: "ALL_NEW"
    };
    const result = await ddb.updateItem(params).promise();
    return result;
    } catch (err) {
      console.info("Update Channel > err:", err, err.stack);
      throw new Error(err);
    }
};

function msToTime(e){function n(e,n){return("00"+e).slice(-(n=n||2))}var r=e%1e3,i=(e=(e-r)/1e3)%60,t=(e=(e-i)/60)%60;return n((e-t)/60)+":"+n(t)+":"+n(i)+"."+n(r,3)}