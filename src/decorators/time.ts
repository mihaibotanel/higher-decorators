export function time(): MethodDecorator {
    return function ( _target: Object, _propertyKey: string | symbol, _descriptor: PropertyDescriptor) {
        const original = _descriptor.value;
        _descriptor.value = function (..._args: any): any {
            console.time(`time _${_propertyKey.toString()}_`)
            const _returnValue = original.apply(this, _args)
            console.timeLog(`time _${_propertyKey.toString()}_`)
            return _returnValue
        }
    }
}