const _ = {
    clone (source) {
        return Object.assign({}, source);
    },

    /**
     * @param {Object} source
     * @param {String[]} keys
     * @returns {Object}
     */
    pick (source, keys) {
        const result = {};
        keys.forEach((key) => {
            result[key] = source[key];
        });
        return result;
    },

    /**
     * @see {#pick}
     */
    omit (source, keys) {
        const result = {};
        Object.keys(source).forEach((key) => {
            if (keys.indexOf(key) === -1) {
                result[key] = source[key];
            }
        });
        return result;
    }
};

export default _;
