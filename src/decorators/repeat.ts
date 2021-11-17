export function repeat(interval: number = 0, times?: number): MethodDecorator {
    return function ( _target: Object, _propertyKey: string | symbol, _descriptor: PropertyDescriptor) {
        const original = _descriptor.value;
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
        _descriptor.value = function (...args: any): any {
            if(times === 0) return
            _this = this
            _args = args
            applyFunction()
            return { cancel, pause, resume }
        }
    }
}
