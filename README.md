# @npm/decorate

Decorate a function, forwarding properties.

```javascript
const decorate = require('@npm/decorate')

function myFunction () {
  return 1
}
myFunction.bloo = 3

const decorated = decorate(myFunction, (...args) => {
  return myFunction(...args) + 1
})

console.log(decorated.name) // myFunction
console.log(decorated.bloo) // 3
console.log(decorated())    // 2
```

---

## API

### `decorate(inner, wrapper) -> Function`

Forward all properties from inner to a merged function that calls wrapper.

### `decorate.undecorate(Function) -> Function | Null`

Return the inner function of a decorated function. or null.

### `decorate.decorations(Function) -> Iterator<Function>`

Return an iterator that yields all decorations of a given function in order.

## License

ISC
