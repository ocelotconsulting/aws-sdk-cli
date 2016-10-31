# aws-sdk-cli

## A set of AWS CLI tools for nodejs
This toolset will be used by lambdas or other javascript code which may not have
the proper AWS CLI installed.

## To Install

    $ npm install -g aws-sdk-cli

## To Use

Commands are prefixed by aws-sdk-cli. For usage info type:

    $ aws-sd-cli -h

You can also append `-h` to any command for detailed help info on that particular command.

### Command supported
Currently the additions to CLI include those supporting
* To copy a local file to S3


    $ aws-sdk-cli cp <filename> <s3-path>

* To create/update a stack in CloudFormation


    $ aws-sdk-cli update-stack -t <template-filename> -p <parameters-filename> <stackname>
