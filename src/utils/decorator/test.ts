export function D_Logger<This, Args extends any[], Return>(
  originalMethod: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
) {
  const methodName = String(context.name)

  context.addInitializer(function (this: any) {
    this[methodName] = this[methodName].bind(this)
  })

  return async function (this: This, ...args: Args): Promise<Awaited<Return>> {
    console.log(`[LOG] Starting: ${methodName}`)
    const result = await originalMethod.call(this, ...args)
    console.log(`[LOG] Finished: ${methodName}`)
    return result
  }
}

export function DClassDecorator<Vals extends new (...args: any[]) => any>(
  value: Vals,
  context: ClassDecoratorContext<Vals>
): Vals | void {
  const className = String(context.name)

  console.log(`Method from class : ${className} is called`)
}
