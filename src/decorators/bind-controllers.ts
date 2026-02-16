import { Express } from 'express'
import { IControllerMetadata } from './decorators.js'

type IControllerConstructor = new (...args: any[]) => any

// Ensure Symbol.metadata exists (polyfill for older runtimes)
if (!Symbol.metadata) {
  ;(Symbol as any).metadata = Symbol.for('Symbol.metadata')
}

/**
 * Binds controller classes to an Express application
 * Reads decorator metadata and registers routes with their middlewares
 *
 * @param app - Express application instance
 * @param controllers - Array of controller classes
 *
 * @example
 * ```typescript
 * import { UserController } from './controllers/user.controller.js'
 * import { PostController } from './controllers/post.controller.js'
 *
 * bindControllers(app, [UserController, PostController])
 * ```
 */
export function bindControllers(app: Express, controllers: IControllerConstructor[]) {
  controllers.forEach((ControllerClass) => {
    const instance = new ControllerClass()

    // Access metadata from the constructor using Symbol.metadata
    const metadata = (ControllerClass as any)[Symbol.metadata] as IControllerMetadata | undefined

    if (!metadata) {
      console.warn(`❌ No metadata found for controller: ${ControllerClass.name}`)
      return
    }

    const prefix = metadata.prefix || ''
    const routes = metadata.routes || []
    const middlewaresMap = metadata.middlewares || new Map()
    const globalMiddlewares = middlewaresMap.get('__global__') || []

    routes.forEach((route) => {
      // Normalize path: remove duplicate slashes and trailing slash
      const fullPath = `/${prefix}${route.path}`.replace(/\/+/g, '/').replace(/\/$/, '') || '/'

      // Get the handler method from the instance
      const handler = (instance as any)[route.handlerName]

      if (typeof handler !== 'function') {
        console.error(
          `❌ Handler ${String(route.handlerName)} is not a function in ${ControllerClass.name}`
        )
        return
      }

      // Get route-specific middlewares
      const routeMiddlewares = middlewaresMap.get(route.handlerName) || []

      // Combine global middlewares + route-specific middlewares
      const allMiddlewares = [...globalMiddlewares, ...routeMiddlewares]

      // Register the route with middlewares and handler
      if (allMiddlewares.length > 0) {
        ;(app as any)[route.method](fullPath, ...allMiddlewares, handler)
        const globalCount = globalMiddlewares.length
        const routeCount = routeMiddlewares.length
        const middlewareInfo =
          globalCount > 0 && routeCount > 0
            ? `${globalCount} global + ${routeCount} route`
            : `${allMiddlewares.length}`
        console.log(
          `🚀 Registered: [${route.method.toUpperCase()}] ${fullPath} (${middlewareInfo} middleware${allMiddlewares.length > 1 ? 's' : ''})`
        )
      } else {
        ;(app as any)[route.method](fullPath, handler)
        console.log(`🚀 Registered: [${route.method.toUpperCase()}] ${fullPath}`)
      }
    })
  })
}
