export function repeat(interval: number = 0, times?: number): MethodDecorator {
    return function ( target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const original = descriptor.value;
        let invoked = 0, paused = false, canceled = false
        let _this: any, _args: any
        const applyFunction = () => {
            setTimeout(() => {
                original.apply(_this, _args)
                if(!canceled && !paused && (!times || ++invoked < times)) {
                    applyFunction()
                }
            }, interval)
        }
        const cancel = () => canceled = true
        const pause = () => paused = true
        const resume = () => { 
            paused = false 
            if(!times || ++invoked < times) applyFunction()
        }
        descriptor.value = function (...args: any): any {
            if(times === 0) return
            _this = this
            _args = args
            applyFunction()
            return { cancel, pause, resume }
        }
    }
}
