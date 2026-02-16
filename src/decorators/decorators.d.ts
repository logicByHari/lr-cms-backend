import { RequestHandler } from 'express'

export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'

export interface IRouteMetadata {
  path: string
  method: HttpMethod
  handlerName: string | symbol
  middlewares?: RequestHandler[]
}

export interface IControllerMetadata {
  prefix?: string
  routes?: IRouteMetadata[]
  middlewares?: Map<string | symbol, RequestHandler[]>
}
