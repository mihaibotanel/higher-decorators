# Higher Decorators

Library that offers a wide range of functional decorators for efficient and effective code development.

## Installation

```
# npm
npm i higher-decorators

# yarn
yarn add higher-decorators
```

## Usage

### @cached

Uses a memoization mechanism for functions

#### Parameters

`timeout?: number` - lifetime of a stored value in milliseconds

#### Returns

The cached return value

#### Example

```
class Process {
    @cached()
    run(a: number, b: number) {
        // complex algorithm
        return a * b
    }
}
```


### @repeat 

Makes a function call repeat itself

#### Parameters

`interval: number = 0` - interval between calls in milliseconds

`times?: number` - number of calls

#### Returns

`cancel: Function` - abolish the recurrence calls 

`pause: Function` - pause the recurrence calls

`resume: Function` - resume the recurrence calls

#### Example

```
class Process {
    @repeat(10000, 20)
    run() {
        // computations
        console.log('Status')
    }
}

const process = new Process()
const { cancel, pause, resume } = process.run()
setTimeout(pause, 1000)
setTimeout(resume, 3000)
setTimeout(cancel, 6000)
```


### @wrap

Uses a wrapper function in a convenience way

#### Parameters

`wrapper: Wrapper` - the wrapper function

#### Returns

The return value

#### Example

```
const errorHandler = (fn: Function, ...args: any) => {
  try {
      fn(...args)
  } catch(err) {
    console.log('Catched', err);
  }
}

class Process {
  @wrap(errorHandler)
  run(value: string) {
      throw new Error(value)
  }
}
```


### @time

Logs the time used by a function

#### Parameters

No parameters

#### Returns

The return value

#### Example

```
class Process {
  @time()
  run() {
    // complex algorithm
  }
}
```

### @delay

Postpones the function call

#### Parameters

`timeout: number` - delay time in milliseconds

#### Returns

No return value

#### Example

```
class Process {
  @delay(500)
  run() {
    console.log('Run after 500 milliseconds')
  }
}
```

### @promisifyDelay

Postpones the function call returning a promise object

#### Parameters

`timeout: number` - delay time in milliseconds

#### Returns

A promise object for delay

```
class Process {
  @promisifyDelay(500)
  run() {
    console.log('Run after 500 milliseconds')
  }
}

const process = new Process()
process.run().then(() => {
    console.log('The End')
})
```
