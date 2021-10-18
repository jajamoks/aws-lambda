import * as AWS from 'aws-sdk';

import { getVar } from '@config/env';
import { CONSTANTS } from '@enums/constants';

const localConfig = () => {
  return { endpoint: 'http://localhost:4566' };
};

export default () => {
  AWS.config.update({
    ...localConfig(),
    region: getVar(CONSTANTS.AWS_REGION),
    credentials: new AWS.SharedIniFileCredentials({
      profile: getVar(CONSTANTS.AWS_PROFILE),
    }),
  });
};
