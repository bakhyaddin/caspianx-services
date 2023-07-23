import { Response } from 'express'
import { nodeEnvironment } from '../constants/env-variables'
import { ErrorType, Environment } from '../constants'
import {
  InternalErrorResponse,
  NotFoundResponse,
  NoDataResponse,
  BadRequestResponse,
  AuthFailureResponse,
  ForbiddenResponse
} from './ApiResponse'

/**
 * ApiError class for all error to handle.
 */
export abstract class ApiError extends Error {
  constructor(public type: ErrorType, public message: string = 'error') {
    super(type)
  }

  /**
   * returns ApiResponse class based on ErrorType
   *
   * @public
   * @param {ApiError} err
   * @param {Response} res
   * @return {ApiResponse}
   * @memberof ApiError
   */
  public static handle(err: ApiError, res: Response): Response {
    switch (err.type) {
      case ErrorType.INTERNAL:
        return new InternalErrorResponse(err.message).send(res)
      case ErrorType.NOT_FOUND:
        return new NotFoundResponse(err.message).send(res)
      case ErrorType.NO_DATA:
        return new NoDataResponse(err.message).send(res)
      case ErrorType.BAD_TOKEN:
      case ErrorType.UNAUTHORIZED:
      case ErrorType.TOKEN_EXPIRED:
        return new AuthFailureResponse(err.message).send(res)
      case ErrorType.BAD_REQUEST:
        return new BadRequestResponse(err.message).send(res)
      case ErrorType.FORBIDDEN:
        return new ForbiddenResponse(err.message).send(res)
      default: {
        let { message } = err
        if (nodeEnvironment === Environment.Production)
          message = 'Something wrong happened.'
        return new InternalErrorResponse(message).send(res)
      }
    }
  }
}

/**
 * InternalError class.
 * @extends {ApiError}
 * @constructor(message: string)
 */
export class InternalError extends ApiError {
  constructor(message = 'Internal error') {
    super(ErrorType.INTERNAL, message)
  }
}

/**
 * BadRequestError class.
 * @extends {ApiError}
 * @constructor(message: string)
 */
export class BadRequestError extends ApiError {
  constructor(message = 'Bad Request') {
    super(ErrorType.BAD_REQUEST, message)
  }
}

/**
 * NotFoundError class.
 * @extends {ApiError}
 * @constructor(message: string)
 */
export class NotFoundError extends ApiError {
  constructor(message = 'Not Found') {
    super(ErrorType.NOT_FOUND, message)
  }
}

/**
 * NoDataError class.
 * @extends {ApiError}
 * @constructor(message: string)
 */
export class NoDataError extends ApiError {
  constructor(message = 'No data available') {
    super(ErrorType.NO_DATA, message)
  }
}

/**
 * AuthFailureError class.
 * @extends {ApiError}
 * @constructor(message: string)
 */
export class AuthFailureError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(ErrorType.UNAUTHORIZED, message)
  }
}

/**
 * BadTokenError class.
 * @extends {ApiError}
 * @constructor(message: string)
 */
export class BadTokenError extends ApiError {
  constructor(message = 'Token is not valid') {
    super(ErrorType.BAD_TOKEN, message)
  }
}

/**
 * TokenExpiredError class.
 * @extends {ApiError}
 * @constructor(message: string)
 */
export class TokenExpiredError extends ApiError {
  constructor(message = 'Token is expired') {
    super(ErrorType.TOKEN_EXPIRED, message)
  }
}

/**
 * ForbiddenError class.
 * @extends {ApiError}
 * @constructor(message: string)
 */
export class ForbiddenError extends ApiError {
  constructor(message = 'Permission denied') {
    super(ErrorType.FORBIDDEN, message)
  }
}
