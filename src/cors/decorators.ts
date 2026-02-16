type IHttpMethods = 'get' | 'post' | 'patch' | 'put' | 'delete'

type IRoute = {
  method: IHttpMethods
  path: string
  handlerName: string | symbol
}

// Global registry (simulating Nest's Discovery Service)
export const CONTROLLER_ROUTES = new Map<any, IRoute[]>()

export function Controller(prefix: string) {
  return function (value: any, context: ClassDecoratorContext) {
    context.addInitializer(function () {
      this.prototype.routePrefix = prefix
    })
  }
}

function createRouteDecorator(method: IRoute['method']) {
  return function (path: string) {
    return function (value: Function, context: ClassMethodDecoratorContext) {
      const target = context.name

      context.addInitializer(function (this: any) {
        if (!CONTROLLER_ROUTES.has(this.constructor)) {
          CONTROLLER_ROUTES.set(this.constructor, [])
        }
        CONTROLLER_ROUTES.get(this.constructor)!.push({
          method,
          path,
          handlerName: target,
        })
      })
    }
  }
}

export const Get = createRouteDecorator('get')
export const Post = createRouteDecorator('post')
export const Patch = createRouteDecorator('patch')
export const Put = createRouteDecorator('put')
export const Delete = createRouteDecorator('delete')
