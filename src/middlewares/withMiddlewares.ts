import { logger } from '@utils/logger';

const withMiddlewares =
  (handler: Function, middlewares: Array<Function> = []) =>
  (event, context, callback?: Function): Function => {
    const chainMiddlewares = ([
      firstMiddleware,
      ...restOfMiddlewares
    ]: Array<Function>) => {
      if (firstMiddleware) {
        return (event, context): Promise<Function> => {
          try {
            return firstMiddleware(
              event,
              context,
              chainMiddlewares(restOfMiddlewares),
            );
          } catch (error) {
            return Promise.reject(error);
          }
        };
      }

      return handler;
    };

    if (!callback) {
      return chainMiddlewares(middlewares)(event, context);
    }

    chainMiddlewares(middlewares)(event, context)
      .then((result) => callback(null, result))
      .catch((error) => {
        logger.error('Middleware handler failed', { error, event, context });

        callback(error, null);
      });
  };

export default withMiddlewares;
