import { HttpMethod, IControllerMetadata } from './decorators.js'

/**
 * Creates a route decorator for a specific HTTP method
 * @param method - The HTTP method (get, post, put, patch, delete)
 */
function createRoute(method: HttpMethod) {
  return function (path: string = '/') {
    return function <This, Args extends any[], Return>(
      _value: (this: This, ...args: Args) => Return,
      context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
    ) {
      if (context.kind !== 'method') {
        throw new Error('Route decorators can only be applied to methods')
      }

      const metadata = context.metadata as IControllerMetadata

      if (!metadata.routes) {
        metadata.routes = []
      }

      metadata.routes.push({
        path,
        method,
        handlerName: context.name,
      })

      // Auto-bind 'this' to the method so it works inside Express handlers
      context.addInitializer(function (this: This) {
        const originalMethod = (this as any)[context.name]
        ;(this as any)[context.name] = originalMethod.bind(this)
      })
    }
  }
}

/**
 * Decorator for GET routes
 * @param path - The route path (default: '/')
 *
 * @example
 * ```typescript
 * @Get('/users')
 * getUsers(req: Request, res: Response) { }
 * ```
 */
export const Get = createRoute('get')

/**
 * Decorator for POST routes
 * @param path - The route path (default: '/')
 *
 * @example
 * ```typescript
 * @Post('/users')
 * createUser(req: Request, res: Response) { }
 * ```
 */
export const Post = createRoute('post')

/**
 * Decorator for PUT routes
 * @param path - The route path (default: '/')
 *
 * @example
 * ```typescript
 * @Put('/users/:id')
 * updateUser(req: Request, res: Response) { }
 * ```
 */
export const Put = createRoute('put')

/**
 * Decorator for PATCH routes
 * @param path - The route path (default: '/')
 *
 * @example
 * ```typescript
 * @Patch('/users/:id')
 * patchUser(req: Request, res: Response) { }
 * ```
 */
export const Patch = createRoute('patch')

/**
 * Decorator for DELETE routes
 * @param path - The route path (default: '/')
 *
 * @example
 * ```typescript
 * @Delete('/users/:id')
 * deleteUser(req: Request, res: Response) { }
 * ```
 */
export const Delete = createRoute('delete')
