'use strict'

module.exports = Object.assign(decorate, {undecorate, decorations})

const DECORATED = Symbol('decorated')

function decorate (inner, wrapper) {
  merged[DECORATED] = inner
  Object.assign(merged, inner)
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
    yield fn
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
