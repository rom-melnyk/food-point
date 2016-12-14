const config = require('../config.json');

function wrapResponse(payload, message, debug) {
    if (arguments.length > 1) {
        const result = {
            error: true,
            code: payload,
            message
        };
        if (!config.isProduction) {
            result.debug = debug;
        }
        return result
    }

    return { payload };
}

module.exports = { wrapResponse };
