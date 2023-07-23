import { Environment } from '../constants/environment';

/**
 * Return true if the instance is being run in a local environment
 *
 * For example, this can be used to determine which S3 instance to point to
 * (e.g., local minio instance vs. a live AWS one)
 * @return {boolean}
 */

export const isLocalEnvironment = (): boolean =>
  process.env.NODE_ENV === Environment.Test ||
  process.env.NODE_ENV === Environment.Dev;

/**
 * Returns stringified version of any data
 *
 * @param {any} data
 * @return {string}
 */
export const stringify = (data: any): string => JSON.stringify(data);

/**
 * Returns true if the instance is being run in a local environment
 *
 * We pass "synchronize" for TypeORM based on the returned value of the fuction
 * @return {boolean}
 */

export const deleteMissingValueKeys = <T extends Record<string, any>>(
  data: T
): T => {
  const clone: T = {} as T;
  Object.assign(clone, data);
  for (const i in clone)
    if (typeof clone[i] === 'undefined' || clone[i] === null) delete clone[i];
  return clone;
};
