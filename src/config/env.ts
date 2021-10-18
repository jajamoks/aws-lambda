/**
 * Returns the contents from an ENV var or an error if it does not exist
 * @param {string} key
 * @param {Boolean=} isRequired
 * @param {string=} fallback
 */
const getVar = (
  key: string,
  isRequired = true,
  fallback: any = null,
): string => {
  const value = process.env[key];

  if (!value || value === 'undefined') {
    if (isRequired) {
      throw new Error(`Missing environment variable ${key}`);
    }

    // For optional environment variables return the fallback when provided
    if (fallback) {
      return fallback;
    }
  }

  return value;
};

/**
 *  Returns true if runtime environment is not AWS (assuming local application context)
 */
const isLocal = (env = process.env): boolean => !isAWS(env);

/**
 *  Returns true if runtime environment is AWS Lambda
 */
const isAWS = (env = process.env): boolean => 'AWS_LAMBDA_FUNCTION_NAME' in env;

export { getVar, isAWS, isLocal };
