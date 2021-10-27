export function delay(timeout: number): MethodDecorator {
    return function ( target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const original = descriptor.value;    
        descriptor.value = function (...args: any): any {
            setTimeout(() => original.apply(this, args), timeout)
        }
    }
}
