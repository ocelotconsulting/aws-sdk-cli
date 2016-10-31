#!/usr/bin/env node
'use strict'

const cp = require('./s3/cp.js')
const program = require('commander')
const upsertStack = require('./cloudformation/upsertStack')

program
  .version('0.0.1')
  .command('cp <file> <path>').action(cp)

program
  .command('update-stack <stackname>')
    .option('-t, --template <template-filename>', 'The filename for the CloudFormation template')
    .option('-p, --parameters <parameters-filename>', 'The filename to retrieve parameter values from')
    .option('-r, --region [region]', 'The region to execute the stack formation in [region]', 'us-east-1')
    .action((stackName, options) => upsertStack(stackName, options.region, options.template, options.parameters))

program.parse(process.argv)
