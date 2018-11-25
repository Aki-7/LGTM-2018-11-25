/**
 * Async glob module.
 * @module aglob
 * @version 3.0.1
 */

'use strict'

const aglob = require('./aglob')

let lib = aglob.bind(this)

Object.assign(lib, aglob, {
  aglob
})

module.exports = lib
