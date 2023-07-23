import { Request, Response, NextFunction } from 'express'

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>

/**
 * the main purpose of this handler is to catch server errors(500)
 * and pass it to the next middleware
 */
export default (execution: AsyncFunction) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  execution(req, res, next).catch(next)
}
