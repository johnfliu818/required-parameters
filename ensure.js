function ensure_list(hash) {
    var result = [];
    for (var key in hash) {
        var val = hash[key];
        if (val == null || val === false) result.push(key);
    }
    return result;
}

var ensure = {
    list: ensure_list,
    first: function(hash) {
        var result = ensure_list(hash);
        if (result.length > 0) return result[0];
        else return undefined;
    },
    throw: function(hash) {
        var result = ensure_list(hash);
        if (result.length > 0) throw new TypeError('' + result[0] + ' is required');
    },
    throwAll: function(hash) {
        var result = ensure_list(hash);
        if (result.length === 1) throw new TypeError('' + result[0] + ' is required');
        if (result.length > 1) throw new TypeError('' + result.join(', ') + ' are required');
    }
};

module.exports = ensure