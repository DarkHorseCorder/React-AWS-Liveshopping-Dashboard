const AWS = require("aws-sdk");
var ses = new AWS.SES({ region: "eu-west-1" });
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let sameuser;
  let validpass;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers" : "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"

  };

  try {
    switch (event.routeKey) {
      case "DELETE /user/{id}":
        await dynamo
          .delete({
            TableName: "live-shopping-user",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        body = `Deleted item ${event.pathParameters.id}`;
        break;
      case "GET /user/disable/{id}":
        let userdata = await dynamo
          .get({
            TableName: "live-shopping-user",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        body = await dynamo
          .update({
            TableName: "live-shopping-user",
            Key: {
              id: event.pathParameters.id
            },
            UpdateExpression: 'set state_disable = :update_state', 
            // ExpressionAttributeNames: {'#a' : 'Sum'},
            ExpressionAttributeValues: {
              ':update_state' : userdata["Item"]["state_disable"] ? false : true,
            }
          })
          .promise();
        break;
      case "GET /user/{id}":
        body = await dynamo
          .get({
            TableName: "live-shopping-user",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        break;
      case "POST /user/{id}":
        let update_requestJSON = JSON.parse(event.body);
        body = await dynamo
          .update({
            TableName: "live-shopping-user",
            Key: {
              id: event.pathParameters.id
            },
            UpdateExpression: 'set username = :update_username, email = :update_email, bio = :update_bio, password = :update_password, website = :update_website, business = :update_business, firstname = :update_firstname, lastname = :update_lastname, bilingaddress = :update_bilingaddress, city = :update_city, codepostal = :update_codepostal, pays = :update_pays, introstore = :update_introstore', 
            // ExpressionAttributeNames: {'#a' : 'Sum'},
            ExpressionAttributeValues: {
              ':update_username' : update_requestJSON.username ? update_requestJSON.username : '',
              ':update_email' : update_requestJSON.email ? update_requestJSON.email : '',
              ':update_bio' : update_requestJSON.bio ? update_requestJSON.bio : '',
              ':update_password' : update_requestJSON.password ? update_requestJSON.password : '',
              ':update_website' : update_requestJSON.website ? update_requestJSON.website : '',
              ':update_business' : update_requestJSON.business ? update_requestJSON.business : '',
              ':update_firstname' : update_requestJSON.firstname ? update_requestJSON.firstname : '',
              ':update_lastname' : update_requestJSON.lastname ? update_requestJSON.lastname : '',
              ':update_bilingaddress' : update_requestJSON.bilingaddress ? update_requestJSON.bilingaddress : '',
              ':update_city' : update_requestJSON.city ? update_requestJSON.city : '',
              ':update_codepostal' : update_requestJSON.codepostal ? update_requestJSON.codepostal : '',
              ':update_pays' : update_requestJSON.pays ? update_requestJSON.pays : '',
              ':update_introstore' : update_requestJSON.introstore ? update_requestJSON.introstore : '',
            }
          })
          .promise();
        break;
      case "GET /user":
        body = await dynamo.scan({ TableName: "live-shopping-user" }).promise();
        break;
      case "POST /user/login":
        let requestJSON = JSON.parse(event.body);
        sameuser = await dynamo
          .scan({
            TableName: "live-shopping-user",
            FilterExpression : 'username = :this_username',
            ExpressionAttributeValues : {':this_username' : requestJSON.username}
          })
          .promise();
        if(sameuser.Count >= 1 && sameuser.Items[0].password == requestJSON.password){
          
          body = sameuser;
          
        }
        else body = validpass;
        break;
      case "PUT /user":
        let register_requestJSON = JSON.parse(event.body);
        // body = requestJSON.username;
        sameuser = await dynamo
          .scan({
            TableName: "live-shopping-user",
            FilterExpression : 'username = :this_username',
            ExpressionAttributeValues : {':this_username' : register_requestJSON.username}
          })
          .promise();
        // body = sameuser.Count;
        // console.log(sameuser);
        if(sameuser.Count == 0){
        await dynamo
          .put({
            TableName: "live-shopping-user",
            Item: {
              id: new Date().valueOf().toString(),
              username: register_requestJSON.username,
              email: register_requestJSON.email,
              telephone : register_requestJSON.telephone,
              website : register_requestJSON.website,
              prodcategory : register_requestJSON.prodcategory,
              password : register_requestJSON.password,
              firstname : '',
              lastname :'',
              bio : '',
              business : '',
              bilingaddress : '',
              city : '',
              codepostal : '',
              pays : '',
              introstore : '',
              state : {B: false}
            }
          })
          .promise();
          body = `Put item ${register_requestJSON.username}`;
        }
        else
        body = `Same user already exist`;
        // var params = {
        //   Destination: {
        //     ToAddresses: ["dreamfullstacker@gmail.com"],
        //   },
        //   Message: {
        //     Body: {
        //       Text: { Data: "Test" },
        //     },
      
        //     Subject: { Data: "Test Email" },
        //   },
        //   Source: "CoolJonJu@outlook.com",
        // };
        // ses.sendEmail(params).promise();
        // body = `${params}`;
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
    statusCode,
    body,
    headers
  };
};
