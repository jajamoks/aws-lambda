import { expect } from 'chai';
import sinon from 'sinon';

import * as AWSLocalConfig from './awsLocalConfig';
import * as secretsManager from './secretsManager';
import secretsManagerMiddleware from './secretsManagerMiddleware';

describe('secretsManagerMiddleware', function () {
  before(function () {
    sinon.stub(secretsManager, 'load').resolves('done');

    sinon.stub(AWSLocalConfig, 'default');
  });

  after(function () {
    sinon.restore();
  });

  it('Loads secrets and returns next', async function () {
    const loadSecrets = secretsManagerMiddleware([
      'AWS_PROFILE',
      'AWS_REGION',
    ]);

    await loadSecrets('ok', 'yes', (event, context) => {
      expect(event).is.equal('ok');

      expect(context).is.equal('yes');
    });
  });
});
