const req = require('./required')

function required(...array) {
    return req(array)
}

required.throws = function(...array) {
    req.throws(array)
}

required.hasnull = function(...array) {
    return req.hasnull(array)
}

module.exports = required