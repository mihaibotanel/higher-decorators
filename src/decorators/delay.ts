export function delay(timeout: number): MethodDecorator {
    return function ( _target: Object, _propertyKey: string | symbol, _descriptor: PropertyDescriptor) {
        const original = _descriptor.value;    
        _descriptor.value = function (...args: any): any {
            setTimeout(() => original.apply(this, args), timeout)
        }
    }
}
