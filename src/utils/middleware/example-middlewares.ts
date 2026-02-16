import { Request, Response, NextFunction, RequestHandler } from 'express'

/**
 * Example: Simple logging middleware
 */
export const loggerMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
}

/**
 * Example: Simple auth middleware
 */
export const authMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' })
  }

  // Add your token validation logic here
  // For example: verify JWT, check session, etc.

  next()
}

/**
 * Example: Rate limiting middleware
 */
export const rateLimitMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Add your rate limiting logic here
  // For example: check Redis, increment counter, etc.

  next()
}

/**
 * Example: Request validation middleware
 */
export const validateJsonMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    if (!req.is('application/json')) {
      return res.status(415).json({ error: 'Content-Type must be application/json' })
    }
  }
  next()
}
