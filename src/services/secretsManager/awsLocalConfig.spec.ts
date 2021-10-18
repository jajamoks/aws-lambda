import * as AWS from 'aws-sdk';
import { expect } from 'chai';

import AWSLocalConfig from './awsLocalConfig';

describe('AWSLocalConfig', function () {
  before(function () {
    process.env.AWS_REGION = 'ap-southeast-1';

    process.env.AWS_PROFILE = 'test';
  });

  after(function () {
    delete process.env.AWS_REGION;

    delete process.env.AWS_PROFILE;
  });

  it('Sets AWS config to local', function () {
    AWSLocalConfig();

    expect(AWS.config).has.property('endpoint').equal('http://localhost:4566');
  });
});
