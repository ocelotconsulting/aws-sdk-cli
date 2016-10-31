const getCloudFormation = require('../sdk/getCloudFormation')
const winston = require('winston')

const deleteStack = (StackName, Region) => {
  winston.info(`Deleting stack ${StackName}`)
  return getCloudFormation(Region).deleteStack({
    StackName
  }).promise()
  .catch((e) => {
    winston.error(`Couldn't delete stack ${StackName}. ${e.stack}`)
    throw e
  })
}
module.exports = deleteStack
