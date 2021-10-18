/* istanbul ignore file */
import sqsPayload from './fixtures/sqsPayload.json';
import { handler } from './index';

handler(sqsPayload, {});
