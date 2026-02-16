import { Express } from 'express'
import { CONTROLLER_ROUTES } from './decorators.js'

export function bindControllers(app: Express, controllers: any[]) {
  controllers.forEach((ControllerClass) => {
    const instance = new ControllerClass()
    const prefix = instance.routePrefix || ''
    const routes = CONTROLLER_ROUTES.get(ControllerClass) || []

    routes.forEach((route) => {
      const fullPath = `${prefix}${route.path}`.replace(/\/+/g, '/')

      app[route.method](fullPath, (req, res, next) => {
        try {
          return instance[route.handlerName](req, res, next)
        } catch (err) {
          next(err)
        }
      })

      console.log(`Mapped: [${route.method.toUpperCase()}] ${fullPath}`)
    })
  })
}
