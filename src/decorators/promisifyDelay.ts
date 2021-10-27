export function promisifyDelay(timeout: number): MethodDecorator {
    return function ( target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const original = descriptor.value;    
        descriptor.value = async function (...args: any): Promise<any> {
            await new Promise((resolve: TimerHandler) => setTimeout(resolve, timeout))
            return original.apply(this, args);
        }
    }
}
