const fs = require('fs')
const getS3 = require('../sdk/getS3')
const winston = require('winston')

const s3PathRegex = /^[sS]3:\/\/(.*?)\/(.*)/

const parseS3 = (s3Path) => {
  if (!s3Path) {
    winston.error('Expected S3 Path argument')
    return undefined
  }
  const match = s3Path.match(s3PathRegex)
  if (!match) {
    winston.error(`Not a valid S3 Path: ${s3Path}`)
    return undefined
  }
  return {
    bucket: match[1],
    key: match[2]
  }
}

const cp = (fileName, path) => {
  const s3Path = parseS3(path)
  if (s3Path) {
    return getS3().putObject(Object.assign({
      Bucket: s3Path.bucket,
      Key: `${s3Path.key}`,
      Body: fs.createReadStream(`${fileName}`)
    })).promise()
    .catch((e) => {
      winston.error(`Couldn't write ${fileName} to ${path}. ${e.stack}`)
      throw e
    })
  }
  throw new Error(`Could not parse S3 path.`)
}
module.exports = cp
