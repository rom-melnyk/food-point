const _ = require('lodash');

/**
 * @param {Object} obj
 * @param {String[]} keys
 * @returns {Boolean}
 */
function doesObjectContainKeys(obj, keys) {
    if (!keys || !keys.length) {
        return true;
    }

    const objKeys = _.keys(obj);
    return _.every(keys, k => _.indexOf(objKeys, k) !== -1);
}

module.exports = {
    doesObjectContainKeys
};
