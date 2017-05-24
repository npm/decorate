'use strict'

module.exports = Object.assign(decorate, {undecorate, decorations})

const DECORATION = Symbol.for('@npm/decoration')
const DECORATED = Symbol.for('@npm/decorate')

function decorate (inner, wrapper) {
  Object.assign(merged, inner)
  merged[DECORATED] = inner
  merged[DECORATION] = wrapper
  Object.defineProperty(merged, 'name', {
    get () {
      return inner.name
    }
  })
  return merged

  function merged (...args) {
    return wrapper.call(this, ...args)
  }
}

function undecorate (fn) {
  return fn[DECORATED] || null
}

function * decorations (fn) {
  do {
    if (fn[DECORATED]) {
      yield * decorations(fn[DECORATION])
    } else {
      yield fn
    }
  } while (fn = undecorate(fn))
}

function validateBody (schema, view) {
  return decorate(view, (req, context) => {
    const args = Array.from(arguments)
    return req.body.then(body => {
      const result = joi.validate(body, schema)
      if (result.error) {
        throw new reply.BadRequestError(result.error)
      }
      req.validatedBody = Promise.resolve(result.value)
      return view.apply(this, args)
    })
  })
}
