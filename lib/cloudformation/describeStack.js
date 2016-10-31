const getCloudFormation = require('../sdk/getCloudFormation')

const updateStack = (StackName, Region) =>
  getCloudFormation(Region).describeStacks({StackName}).promise()

module.exports = updateStack
