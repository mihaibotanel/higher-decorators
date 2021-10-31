export function cached(timeout?: number): MethodDecorator {
    return function ( target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const original = descriptor.value;
        const cache: Map<string, any> = new Map()
        descriptor.value = function (..._args: any): any {
            let _input: string
            try {
                _input = `cached _${propertyKey.toString()}_: ${JSON.stringify(_args)}`
            } catch(err) {
                console.info('Cache error: The arguments contain either a cyclic object value or a BigInt value')
                return original.apply(this, _args)
            }
            
            if(cache.has(_input)) return cache.get(_input)
            console.log('no');
            
            const _returnValue = original.apply(this, _args)
            cache.set(_input, _returnValue)

            const expire = () => cache.delete(_input)
            if(timeout && timeout > 0) {
                setTimeout(expire, timeout)
            }

            return _returnValue
        }
    }
}
