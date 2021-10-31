interface Wrapper {
    (fn: Function, ...args: any): any
}

export function wrap(wrapper: Wrapper): MethodDecorator {
    return function ( target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const original = descriptor.value;
        descriptor.value = function (...args: any): any {
            return wrapper(original.bind(this), ...args)
        }
    }
}