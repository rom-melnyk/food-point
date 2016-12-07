'use strict';
const config = require('../config.json').session;

let sessionDuration = 24 * 60 * 60 * 1000; // 1 day

_parseAuthDuration(config.duration);

module.exports = {
    duration: sessionDuration
};

// -------------------------- private methods --------------------------
function _parseAuthDuration (string) {
    // '12w' ---> ["12w", "12", "w"]
    const parsed = /^([0-9]+)([smhdw])$/i.exec(string || '');

    if (!parsed) {
        return;
    }

    let coef = parsed[2].toLowerCase();
    coef =
        coef === 's' ? 1000 :
        coef === 'm' ? 1000 * 60 :
        coef === 'h' ? 1000 * 60 * 60 :
        coef === 'd' ? 1000 * 60 * 60 * 24 :
        /* coef === 'w' */ 1000 * 60 * 60 * 24 * 7;

    sessionDuration = parseInt(parsed[1], 10) * coef;
}
