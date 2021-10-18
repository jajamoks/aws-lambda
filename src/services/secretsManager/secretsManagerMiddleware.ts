import { isLocal } from '@config/env';

import AWSLocalConfig from './awsLocalConfig';
import { load } from './secretsManager';

export default (secrets: Array<string>) => async (event, context, next) => {
  if (isLocal()) {
    AWSLocalConfig();
  }

  await load(secrets);

  next(event, context);
};
