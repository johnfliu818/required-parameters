function required(hash) {
    let result = []
    for (let key in hash) {
        let val = hash[key]
        if (val == null) result.push(key)
    }
    return result
}

required.throws = function(hash) {
    let result = required(hash)
    if (result.length > 0) {
        throw new Error(`missing required fields: ${result.join(', ')}`)
    }
}

required.hasnull = function(hash) {
    let result = required(hash)
    return result.length > 0
}

module.exports = required