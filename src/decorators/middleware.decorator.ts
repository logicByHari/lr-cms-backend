import { RequestHandler } from 'express'
import { IControllerMetadata } from './decorators.js'

/**
 * Decorator to attach middleware(s) to a route handler or entire controller
 * @param middlewares - Single middleware or array of middlewares
 *
 * @example
 * On a method (applies to single route):
 * ```typescript
 * @Post('/upload')
 * @UseMiddleware(upload.single('file'))
 * uploadFile(req: Request, res: Response) { }
 * ```
 *
 * Multiple middlewares on a method:
 * ```typescript
 * @Get('/protected')
 * @UseMiddleware([authMiddleware, rateLimitMiddleware])
 * protectedRoute(req: Request, res: Response) { }
 * ```
 *
 * On a class (applies to all routes in controller):
 * ```typescript
 * @Controller('admin')
 * @UseMiddleware([authMiddleware, adminMiddleware])
 * export class AdminController {
 *   @Get('/users')
 *   getUsers(req: Request, res: Response) { }
 *
 *   @Post('/users')
 *   createUser(req: Request, res: Response) { }
 * }
 * ```
 *
 * Stacked decorators:
 * ```typescript
 * @Post('/data')
 * @UseMiddleware(authMiddleware)
 * @UseMiddleware(loggerMiddleware)
 * createData(req: Request, res: Response) { }
 * ```
 */
export function UseMiddleware(middlewares: RequestHandler | RequestHandler[]) {
  return function <T extends abstract new (...args: any) => any>(
    _value: T | Function,
    context: ClassDecoratorContext<T> | ClassMethodDecoratorContext
  ) {
    const metadata = context.metadata as IControllerMetadata

    // Initialize middlewares map if it doesn't exist
    if (!metadata.middlewares) {
      metadata.middlewares = new Map()
    }

    // Normalize to array
    const middlewareArray = Array.isArray(middlewares) ? middlewares : [middlewares]

    if (context.kind === 'class') {
      // Store global middlewares for the entire controller
      const existing = metadata.middlewares.get('__global__') || []
      metadata.middlewares.set('__global__', [...existing, ...middlewareArray])
    } else if (context.kind === 'method') {
      // Store middlewares for this specific method
      const existing = metadata.middlewares.get(context.name) || []
      metadata.middlewares.set(context.name, [...existing, ...middlewareArray])
    } else {
      throw new Error('UseMiddleware decorator can only be applied to classes or methods')
    }
  }
}
