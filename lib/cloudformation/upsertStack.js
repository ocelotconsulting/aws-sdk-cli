const describeStack = require('./describeStack')
const updateStack = require('./updateStack')
const listStackResources = require('./listStackResources')
const createStack = require('./createStack')
const deleteStack = require('./deleteStack')
const getCloudFormation = require('../sdk/getCloudFormation')
const winston = require('winston')

const isStackDeleteable = (resources) => resources.filter(resource => resource['ResourceStatus'] !== 'DELETE_COMPLETE').length === 0

const deleteAndReCreate = (StackName, Region, templateFileName, parametersFileName) =>
  deleteStack(StackName, Region)
  .then((result) => getCloudFormation(Region)
    .waitFor('stackDeleteComplete', { StackName }).promise()
  )
  .then((result) => createStack(StackName, Region, templateFileName, parametersFileName))

const deleteOrUpdate = (StackName, Region, templateFileName, parametersFileName) => (resources) =>
  (isStackDeleteable(resources['StackResourceSummaries']))
    // If all stack resources have been deleted, assume existing stack is to be deleted
    ? deleteAndReCreate(StackName, Region, templateFileName, parametersFileName)
    // If some stack resources are in a non-deleted state, update the stack
    : updateStack(StackName, Region, templateFileName, parametersFileName)

const upsertStack = (StackName, Region, templateFileName, parametersFileName) =>
  describeStack(StackName, Region)
  .then(() =>
    listStackResources(StackName, Region)
    .then(deleteOrUpdate(StackName, Region, templateFileName, parametersFileName))
  )
  .catch((err) => {
    if (err.message.includes('does not exist')) {
      return createStack(StackName, Region, templateFileName, parametersFileName)
    } else {
      winston.error(`There has been an error upserting the stack. ${err.stack}`)
      throw err
    }
  })

// const justWaitStatus = [ 'CREATE_IN_PROGRESS', 'ROLLBACK_IN_PROGRESS',
//     'DELETE_IN_PROGRESS', 'UPDATE_IN_PROGRESS', 'UPDATE_COMPLETE_CLEANUP_IN_PROGRESS',
//     'UPDATE_ROLLBACK_IN_PROGRESS', 'UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS' ]
//
// const updateableStatus = [ 'CREATE_COMPLETE', 'DELETE_FAILED', 'ROLLBACK_FAILED', 'ROLLBACK_COMPLETE', 'UPDATE_COMPLETE',
//     'UPDATE_ROLLBACK_FAILED', 'UPDATE_ROLLBACK_COMPLETE' ]
//
// const recreateableStatus = [ 'CREATE_FAILED', 'DELETE_COMPLETE' ]

module.exports = upsertStack
