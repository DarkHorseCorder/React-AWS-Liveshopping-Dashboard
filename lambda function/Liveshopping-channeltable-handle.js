const AWS = require("aws-sdk");
var dynamodb = new AWS.DynamoDB();
const dynamo = new AWS.DynamoDB.DocumentClient();
var s3 = new AWS.S3({apiVersion: '2006-03-01'});
var ivs = new AWS.IVS({apiVersion: '2020-07-14'});
var eventbridge = new AWS.EventBridge();
exports.handler = async (event, context) => {
  let body ={};
  let customername = '';
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers" : "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
  };

  try {
    switch (event.routeKey) {
      case "DELETE /channel/{id}":
        //Delete each channel
        //get channel id from db by id
        let data = await dynamo
          .get({
            TableName: "live-shopping-channel",
            Key: {
              id: event.pathParameters.id
            }
          }).promise();
        if(data.Item){
          let result;
          //first, Delete associated s3 bucket content
          
          //second, stop the channel before delete channel
          if(data.Item.channel_islive == true){
            result = await ivs.stopStream(data.Item.channel_arn).promise();
            if(!result){
              body = "Error while stop live channel";
              break;
            }
          }
          //third, delete the channel
          var deleteChannelparams = {
            arn: data.Item.channel_arn /* required */
          };
          result = await ivs.deleteChannel(deleteChannelparams).promise();
          if(!result){
            body = "Error while delete channel";
            break;
          }
          else{
            //sixth, delete the video stream table
            var deletevideotablename = {
              TableName : "ivs-liveshopping-videotable-customer-" + event.pathParameters.id
            };
            result = await dynamodb.deleteTable(deletevideotablename).promise();
            if(!result){
              body = "Error while delete video table";
              break;
            }
            else {
              // seventh, delete the channel info from the channel table
              var deletechannelItemParams = {
                Key: {
                 "id": {
                   S: event.pathParameters.id
                  }
                }, 
                TableName: "live-shopping-channel"
               };
              // body = deletechannelItemParams;
              result = await dynamodb.deleteItem(deletechannelItemParams).promise();
              if(!result){
                body = "Error while delete video table";
                break;
              }
              else
              body = result;
            }
          }
        }
        else{
          body = "No match channel.";
          break;
        }
        break;
      case "GET /channel/{id}":
        //get detail of each channel by id
        let channel_result;
        channel_result = await dynamo
          .get({
            TableName: "live-shopping-channel",
            Key: {
              id: event.pathParameters.id
            }
          }).promise();
        if(!channel_result){
          body = "There is no channel match";
          break;
        }
        body = channel_result;
        break;
      case "GET /channel":
        // get all channel info from db
        // let channels_result;
        // channels_result = await dynamo.scan({ TableName: "live-shopping-channel" }).promise();
        // if(!channels_result){
        //   body = "There is no channels";
        //   break;
        // }
        body = await dynamo.scan({ TableName: "live-shopping-channel" }).promise();
        break;
      case "PUT /channel":
        //add new channel by super admin
        customername = JSON.parse(event.body).customerName;
        //first, create the channel by recordingconfiguration
        var channelname = "ivs-liveshopping-channel-customer-" + customername;
        var channelparams = {
          authorized: false,
          latencyMode: "LOW",
          name: channelname,
          recordingConfigurationArn: "arn:aws:ivs:eu-west-1:263504711656:recording-configuration/Qtuq5Jw29yXC",
          tags: {
            
          },
          type: "STANDARD"
        };
        body.createdchannel = await ivs.createChannel(channelparams).promise();
        //save all info to the live-shopping-channel table
        if(body.createdchannel)
        await dynamo
          .put({
            TableName: "live-shopping-channel",
            Item: {
              id: customername,
              channel_arn : body.createdchannel.channel.arn,
              channel_name: body.createdchannel.channel.name,
              channel_ingestserver : "rtmps://" + body.createdchannel.channel.ingestEndpoint + ":443/app/",
              channel_islive : false,
              channel_playbackURL : body.createdchannel.channel.playbackUrl,
              streamkey_arn : body.createdchannel.streamKey.arn,
              streamkey :body.createdchannel.streamKey.value,
            }
          })
          .promise();
        //create new video table for save video stream info
        var videotable_name = "ivs-liveshopping-videotable-customer-" + customername;
        var create_videotable_params = {
          AttributeDefinitions: [
            {
              AttributeName: "id", 
              AttributeType: "S"
            }
          ], 
          KeySchema: [
             {
            AttributeName: "id", 
            KeyType: "HASH"
           }
          ], 
          ProvisionedThroughput: {
           ReadCapacityUnits: 5, 
           WriteCapacityUnits: 5
          }, 
          TableName: videotable_name
         };
         let create_table_result = await dynamodb.createTable(create_videotable_params).promise();
         if(!create_table_result){
           body = "Error while creating table for video";
         }
         body.createdvideotable = create_table_result;
        break;
      case "GET /channel/{id}/video":
        //get video stream info from video table
        let selected_videotablename = "ivs-liveshopping-videotable-customer-" + event.pathParameters.id;
        let result = await dynamo.scan({ TableName: selected_videotablename }).promise();
        if(!result){
          body = "There is no video channels";
          break;
        }
        else body = result;
        break;
      case "PUT /channel/{id}/video":
        //put new scheduled video stream setting
        let scheduled_videotablename = "ivs-liveshopping-videotable-customer-" + event.pathParameters.id;
        let requestJSON = JSON.parse(event.body);
        let scheduled_videoresult = await dynamo
        .put({
          TableName: scheduled_videotablename,
          Item: {
            id: new Date().valueOf().toString(),
            Title : requestJSON.scheduled_video_title ? requestJSON.scheduled_video_title : '',
            SubTitle: requestJSON.scheduled_video_description ? requestJSON.scheduled_video_description : '',
            Scheduled_date : requestJSON.scheduled_video_date&&requestJSON.scheduled_video_time ? requestJSON.scheduled_video_date + ' ' + requestJSON.scheduled_video_time : '',
            Scheduled_video_host : requestJSON.scheduled_video_host ? requestJSON.scheduled_video_host : '',
            ChatSetting : requestJSON.scheduled_video_livechatsetting ? requestJSON.scheduled_video_livechatsetting : false,
            ReplaySetting : requestJSON.scheduled_video_showreplaysetting ? requestJSON.scheduled_video_showreplaysetting : false,
            HitcounterSetting : requestJSON.scheduled_video_hitcountersetting ? requestJSON.scheduled_video_hitcountersetting : false,
            AllowreplaySetting : requestJSON.scheduled_video_allowreplaysetting ? requestJSON.scheduled_video_allowreplaysetting : false,
            SourceType : requestJSON.scheduled_video_sourcetype ? requestJSON.scheduled_video_sourcetype : 1,
            Source : requestJSON.scheduled_video_source ? requestJSON.scheduled_video_source : '',
            Productions : requestJSON.scheduled_video_production,
            CreatedOn : '',
            CurrentThumbnail : '',
            Length : '',
            PlaybackUrl : '',
            StreamId :'',
            Thumbnails : '',
            Viewers : '',
            Scheduled_Statu : true,
            Current_Schedule : false
          }
        })
        .promise();
        body = scheduled_videoresult;
        break;
      case "GET /channel/{id}/video/{videoid}":
        //
        let selected_videotable = "ivs-liveshopping-videotable-customer-" + event.pathParameters.id;
        let video_result;
        video_result = await dynamo
          .get({
            TableName: selected_videotable,
            Key: {
              id: event.pathParameters.videoid
            }
          }).promise();
        if(!video_result){
          body = "There is no video match";
          break;
        }
        body = video_result;
        break;
      case "PUT /channel/{id}/video/{videoid}":
        //Update the video info such as title, subtitle and thumbnail
        let selected_VideoTable = "ivs-liveshopping-videotable-customer-" + event.pathParameters.id;
        let update_requestJSON = JSON.parse(event.body);
        let video_update_result;
        video_update_result = await dynamo
          .update({
            TableName: selected_VideoTable,
            Key: {
              id: event.pathParameters.videoid
            },
            UpdateExpression: 'set Title = :update_title , SubTitle = :update_subtitle , CurrentThumbnail = :update_thumbnail', 
            // ExpressionAttributeNames: {'#a' : 'Sum'},
            ExpressionAttributeValues: {
              ':update_title' : update_requestJSON.title ? update_requestJSON.title : '',
              ':update_subtitle' : update_requestJSON.subtitle ? update_requestJSON.subtitle : '',
              ':update_thumbnail' : update_requestJSON.subtitle ? update_requestJSON.thumbnail : '',
            }
          })
          .promise();
          if(video_update_result){
            body = "Failed to update the video data";
          }
          let video_updated_result;
          video_updated_result = await await dynamo
            .get({
              TableName: selected_VideoTable,
              Key: {
                id: event.pathParameters.videoid
              }
            }).promise();
          if(!video_updated_result){
            body = "There is no video match";
            break;
          }
        break;
      case "DELETE /channel/{id}/video/{videoid}":
        //
        break;
      case "GET /channel/{id}/l_video":
        //get current live video schedule
        let selected_VTable = "ivs-liveshopping-videotable-customer-" + event.pathParameters.id;
        let videos = await dynamo.scan({ TableName: selected_VTable }).promise();
        for(let i=0; i< videos.Items.length; i++){
          if(videos.Items[i].Current_Schedule){
            body = videos.Items[i];
          }
        }
        break;
      case "PUT /channel/{id}/l_video":
        //put metadata to live stream
        let metadata_JSON = JSON.parse(event.body);
        console.log(metadata_JSON);
        var metadata_params = {
          channelArn: metadata_JSON.channel_arn, /* required */
          metadata : `{\"production_item_name\": "${metadata_JSON.production_item_name}" , \"production_item_price\": "${metadata_JSON.production_item_price}" ,  \"production_item_articleURL\": "${metadata_JSON.production_item_articleURL}",  \"production_item_description\": "${metadata_JSON.prodcution_item_description}",  \"production_item_discount\": "${metadata_JSON.production_item_discount}",  \"production_item_delivery\": "${metadata_JSON.production_item_delivery}",  \"production_item_image_path\": "${metadata_JSON.production_item_image_path}", \"channel_arn\": "${metadata_JSON.channel_arn}"}`
        };
        let metadata_result =await ivs.putMetadata(metadata_params).promise();
        // , function(err, data) {
        //   if (err) console.log("err=================>",err, err.stack); // an error occurred
        //   else     console.log("success*******************>", data);           // successful response
        // });
        // body = metadata;
        body = metadata_result;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    headers,
    statusCode,
    // createdbucket,
    // createdconfigration,
    // configurationlist,
    body,
  };
};
