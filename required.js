function required_list(hash, optionsStr) {
    var options = {};
    if (optionsStr == null) optionsStr = 'nu';
    for (var i = 0; i < optionsStr.length; i++) options[optionsStr[i]] = true;

    var result = [];
    for (var key in hash) {
        var val = hash[key];
        if (options.u && val === undefined ||
            options.n && val === null ||
            options.s && val === '' ||
            options.f && val === false ||
            options.z && val === 0
        ) result.push(key);
    }
    return result;
}

var required = {
    list: required_list,
    first: function(hash, optionsStr) {
        var result = required_list(hash, optionsStr);
        if (result.length > 0) return result[0];
        else return undefined;
    },
    throw: function(hash, optionsStr) {
        var result = required_list(hash, optionsStr);
        if (result.length > 0) throw new TypeError('' + result[0] + ' is required');
    },
    throwAll: function(hash, optionsStr) {
        var result = required_list(hash, optionsStr);
        if (result.length === 1) throw new TypeError('' + result[0] + ' is required');
        if (result.length > 1) throw new TypeError('' + result.join(', ') + ' are required');
    }
};

module.exports = required