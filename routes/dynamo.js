const AWS = require('aws-sdk');
REGION = 'us-west-2'
AWS.config.update({
    region: REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

var Client = new AWS.DynamoDB();
const DynamoDB = new AWS.DynamoDB.DocumentClient();

// Export the module
module.exports = {
    DynamoDB,
    Client,
    AWS
}
