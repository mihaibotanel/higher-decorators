export function time(): MethodDecorator {
    return function ( target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const original = descriptor.value;
        descriptor.value = function (..._args: any): any {
            console.time(`time _${propertyKey.toString()}_`)
            const _returnValue = original.apply(this, _args)
            console.timeLog(`time _${propertyKey.toString()}_`)
            return _returnValue
        }
    }
}