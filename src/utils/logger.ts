/* istanbul ignore file */
import { omit } from 'lodash';
import { createLogger, format, transports } from 'winston';

import { isLocal } from '@config/env';

const isProduction = process.env.NODE_ENV === 'prd';

const logLevel = isProduction ? 'info' : process.env.LOG_LEVEL || 'debug';

/**
 * Simple logging format suitable for localhost development e.g "[INFO] My message {"foo":"bar"}"
 * Leaves out all Splunk related fields that would otherwise clog up your terminal
 */
const localFormat = format.printf(({ level, message, ...args }) => {
  const meta = omit(args, ['level', 'message']);

  return `[${level.toUpperCase()}] ${message} ${
    Object.keys(meta).length ? JSON.stringify(meta) : ''
  }`;
});

const appendAppDetails = format((info) =>
  Object.assign(info, {
    app: 'lambda-service',
    applicationName: 'lambda-service',
    version: process.env.BUILD_VERSION,
  }),
);

const defaultFormat = format.combine(
  appendAppDetails(),
  format.timestamp(),
  format.json(),
);

const logger = createLogger({
  level: logLevel,
  silent: process.env.NODE_ENV === 'test',
  transports: [
    new transports.Console({
      format: isLocal() ? localFormat : defaultFormat,
    }),
  ],
});

export { logger };
