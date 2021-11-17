interface Wrapper {
    (fn: Function, ...args: any): any
}

export function wrap(wrapper: Wrapper): MethodDecorator {
    return function ( _target: Object, _propertyKey: string | symbol, _descriptor: PropertyDescriptor) {
        const original = _descriptor.value;
        _descriptor.value = function (...args: any): any {
            return wrapper(original.bind(this), ...args)
        }
    }
}