const getCloudFormation = require('../sdk/getCloudFormation')
const winston = require('winston')
const fs = require('fs')

const createStack = (StackName, Region, templateFileName, parametersFileName) => {
  winston.info(`Creating stack ${StackName}`)
  return getCloudFormation(Region).createStack(Object.assign({
    StackName,
    Capabilities: ['CAPABILITY_IAM'],
    TemplateBody: fs.readFileSync(templateFileName, 'utf8'),
    Parameters: JSON.parse(fs.readFileSync(parametersFileName, 'utf8'))
  })).promise()
  .catch((e) => {
    winston.error(`Couldn't update stack ${StackName}. ${e.stack}`)
    throw e
  })
}
module.exports = createStack
