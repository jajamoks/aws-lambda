import { SQSEvent } from 'aws-lambda';
import { LambdaResponse } from 'types/lambdaResponse';

import { AWS_SECRETS } from './enums/awsSecrets';
import { secretsManagerMiddleware, withMiddlewares } from './middlewares';
import { logger } from './utils/logger';

const orderUpdateHandler = (event: SQSEvent): LambdaResponse => {
  logger.info(
    `Event received with '${event.Records ? event.Records.length : 0}' records`,
  );

  logger.debug('Event payload', { event });

  const message = 'hello world';

  return {
    statusCode: 200,
    body: JSON.stringify({ message }),
  };
};

const handler = withMiddlewares(orderUpdateHandler, [
  secretsManagerMiddleware(AWS_SECRETS),
]);

export { handler };
