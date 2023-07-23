import { Response } from 'express'
import { ResponseStatus } from '../constants'
import { deleteMissingValueKeys } from '../helpers'

/**
 * ApiResponse class to return response
 */
abstract class ApiResponse {
  protected status_code: ResponseStatus
  protected message?: string
  protected data?: any

  constructor(status_code: ResponseStatus, message?: string, data?: any) {
    this.status_code = status_code
    this.message = message
    this.data = data
  }

  /**
   * returns Response together with status_code and data
   *
   * @public
   * @param {Response} response
   * @return {Response} cloned response
   * @memberof ApiResponse
   */
  protected prepare<T extends ApiResponse>(
    res: Response,
    response: T
  ): Response {
    return res.status(this.status_code).json(ApiResponse.sanitize(response))
  }

  /**
   * calls prepare function which sends a Response
   *
   * @public
   * @param {Response} res
   * @return {this.prepare}
   * @memberof ApiResponse
   */
  public send(res: Response): Response {
    return this.prepare<ApiResponse>(res, this)
  }

  /**
   * returns Response object with undefined keys deleted
   *
   * @private
   * @param {Response} response
   * @return {Response} cloned response
   * @memberof ApiResponse
   */
  private static sanitize<T extends ApiResponse>(response: T): T {
    return deleteMissingValueKeys(response)
  }
}

/**
 * SuccessMsgResponse class.
 * @extends {ApiResponse}
 * @constructor(message: string)
 */
export class SuccessMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(ResponseStatus.SUCCESS, message)
  }
}

/**
 * AuthFailureResponse class.
 * @extends {ApiResponse}
 * @constructor(message: string)
 */
export class AuthFailureResponse extends ApiResponse {
  constructor(message = 'Authentication Failure') {
    super(ResponseStatus.UNAUTHORIZED, message)
  }
}

/**
 * SuccessResponse class.
 * @extends {ApiResponse}
 * @constructor(message: string, data: T)
 */
export class SuccessResponse<T> extends ApiResponse {
  constructor(message: string, protected data: T) {
    super(ResponseStatus.SUCCESS, message)
  }

  send(res: Response): Response {
    return super.prepare<SuccessResponse<T>>(res, this)
  }
}

/**
 * CreatedResponse class.
 * @extends {ApiResponse}
 * @constructor(message: string, data: T)
 */
export class CreatedResponse<T> extends ApiResponse {
  constructor(message: string, protected data: T) {
    super(ResponseStatus.CREATED, message)
  }

  send(res: Response): Response {
    return super.prepare<CreatedResponse<T>>(res, this)
  }
}

/**
 * NotFoundResponse class.
 * @extends {ApiResponse}
 * @constructor(message: string)
 */
export class NotFoundResponse extends ApiResponse {
  private url: string | undefined

  constructor(message = 'Not Found') {
    super(ResponseStatus.NOT_FOUND, message)
  }

  send(res: Response): Response {
    this.url = res.req?.originalUrl
    return super.prepare<NotFoundResponse>(res, this)
  }
}

/**
 * NoDataResponse class.
 * @extends {ApiResponse}
 * @constructor(message: string)
 */
export class NoDataResponse extends ApiResponse {
  constructor(message = 'No Data Found') {
    super(ResponseStatus.NOT_FOUND, message)
  }
}

/**
 * BadRequestResponse class.
 * @extends {ApiResponse}
 * @constructor(message: string)
 */
export class BadRequestResponse extends ApiResponse {
  constructor(message = 'Bad Parameters') {
    super(ResponseStatus.BAD_REQUEST, message)
  }
}

/**
 * InternalErrorResponse class.
 * @extends {ApiResponse}
 * @constructor(message: string)
 */
export class InternalErrorResponse extends ApiResponse {
  constructor(message = 'Internal Error') {
    super(ResponseStatus.INTERNAL_ERROR, message)
  }
}

/**
 * ForbiddenResponse class.
 * @extends {ApiResponse}
 * @constructor(message: string)
 */
export class ForbiddenResponse extends ApiResponse {
  constructor(message = 'Forbidden') {
    super(ResponseStatus.FORBIDDEN, message)
  }
}

/**
 * NoContentResponse class.
 * @extends {ApiResponse}
 * @constructor(message: string)
 */
export class NoContentResponse extends ApiResponse {
  constructor() {
    super(ResponseStatus.NO_CONTENT)
  }
}
