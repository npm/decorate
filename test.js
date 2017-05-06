const assert = require('assert')

const decorate = require('.')

function named (msg) {
  return msg.toUpperCase()
}
named.property = 3

const wrapped = msg => {
  return named('hello ' + msg)
}

const decorated = decorate(named, wrapped)

assert.equal(decorated.name, 'named')
assert.equal(decorated.property, 3)
assert.equal(decorated('world'), 'HELLO WORLD')

assert.equal(decorate.undecorate(decorated)('world'), 'WORLD')
assert.equal(decorate.undecorate(decorate.undecorate(decorated)), null)

const [outer, inner, ...rest] = [...decorate.decorations(decorated)]

assert.equal(outer, wrapped)
assert.equal(inner, named)
assert.deepEqual(rest, [])
