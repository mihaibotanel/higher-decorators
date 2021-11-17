export function cached(timeout?: number): MethodDecorator {
    return function ( _target: Object, _propertyKey: string | symbol, _descriptor: PropertyDescriptor) {
        const original = _descriptor.value;
        const cache: Map<string, any> = new Map()
        _descriptor.value = function (...args: any): any {
            let input: string
            try {
                input = `cached _${_propertyKey.toString()}_: ${JSON.stringify(args)}`
            } catch(err) {
                console.info('Cache error: The arguments contain either a cyclic object value or a BigInt value')
                return original.apply(this, args)
            }
            
            if(cache.has(input)) return cache.get(input)
            
            const returnValue = original.apply(this, args)
            cache.set(input, returnValue)

            const expire = () => cache.delete(input)
            if(timeout && timeout > 0) {
                setTimeout(expire, timeout)
            }

            return returnValue
        }
    }
}
