const getCloudFormation = require('../sdk/getCloudFormation')

const describeStack = (StackName, Region) =>
  getCloudFormation(Region).describeStacks({StackName}).promise()

module.exports = describeStack
