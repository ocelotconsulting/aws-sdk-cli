#!/usr/bin/env node
'use strict'

const cp = require('./s3/cp.js')
const program = require('commander')

program
  .version('0.0.1')
  .command('cp <file> <path>')
  .action(cp)

program.parse(process.argv)
