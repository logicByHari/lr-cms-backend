import { IControllerMetadata } from './decorators.js'

// Ensure Symbol.metadata exists (polyfill for older runtimes)
if (!Symbol.metadata) {
  ;(Symbol as any).metadata = Symbol.for('Symbol.metadata')
}

/**
 * Class decorator to define a controller with a route prefix
 * @param prefix - The route prefix for all routes in this controller
 *
 * @example
 * ```typescript
 * @Controller('users')
 * export class UserController { }
 * ```
 */
export function Controller(prefix: string = '') {
  return function <T extends abstract new (...args: any) => any>(
    _value: T,
    context: ClassDecoratorContext<T>
  ) {
    const metadata = context.metadata as IControllerMetadata
    metadata.prefix = prefix
  }
}
