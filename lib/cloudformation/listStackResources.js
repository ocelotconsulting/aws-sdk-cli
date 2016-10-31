const getCloudFormation = require('../sdk/getCloudFormation')

const listStackResources = (StackName, Region) =>
  getCloudFormation(Region).listStackResources({StackName}).promise()

module.exports = listStackResources
