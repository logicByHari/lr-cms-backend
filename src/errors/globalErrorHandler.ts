import { Request, Response, NextFunction } from 'express'
import { AppError } from './AppError.js'
import { ZodError } from 'zod'

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err)

  // Zod validation error
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      errors: err.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    })
  }

  // Custom AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    })
  }

  // Unknown error
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  })
}
