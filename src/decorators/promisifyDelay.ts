export function promisifyDelay(timeout: number): MethodDecorator {
    return function ( _target: Object, _propertyKey: string | symbol, _descriptor: PropertyDescriptor) {
        const original = _descriptor.value;    
        _descriptor.value = async function (...args: any): Promise<any> {
            await new Promise((resolve: TimerHandler) => setTimeout(resolve, timeout))
            return original.apply(this, args);
        }
    }
}
