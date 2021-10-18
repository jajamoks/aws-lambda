/* eslint-disable @typescript-eslint/naming-convention */
import AWS from 'aws-sdk';

import { logger } from '@utils/logger';

const cache = {};

const getSecret = async (
  key: string,
  useCache = true,
  secretsManager: AWS.SecretsManager = new AWS.SecretsManager(),
): Promise<string> => {
  if (useCache && cache[key]) {
    return cache[key];
  }

  const secretId = process.env[key];

  if (!secretId) {
    throw new Error(`Missing environment variable ${key}`);
  }

  try {
    const { SecretString } = await secretsManager
      .getSecretValue({
        SecretId: secretId,
      })
      .promise();

    cache[key] = SecretString;

    return SecretString;
  } catch (error) {
    logger.error(
      `Error loading AWS Secret ${secretId} from process var ${key}`,
      error,
    );

    throw error;
  }
};

const load = (
  keys: Array<string> = [],
  useCache: boolean | undefined = true,
): Promise<any> =>
  Promise.all(
    keys.map(async (key: string) => {
      const secret: string = await getSecret(key, useCache);

      process.env[key] = secret; // Replace the SecretId with the raw secret string
    }),
  );

const obfuscate = (secret = '', visiblePlainText = 4): string =>
  secret.slice(-visiblePlainText).padStart(secret.length, '*');

export { getSecret, load, obfuscate };
