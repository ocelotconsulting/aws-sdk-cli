const AWS = require('aws-sdk')

module.exports = (region) => new AWS.CloudFormation({region})
