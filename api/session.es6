'use strict';
const Token = require('./token.es6');
const config = require('../config.json');

const COOKIE_NAME = 'session';
let COOKIE_MAX_AGE = 24 * 60 * 60 * 1000; // 1 day

_parseAuthDuration(config.authDuration);

module.exports = {
    // we respect the principle that other middleware use, say `app.use(cookieParser());`
    session: () => _sessionFn,
    enrichRequestAndResponse: _enrichRequestAndResponse
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

    COOKIE_MAX_AGE = parseInt(parsed[1], 10) * coef;
}

function _sessionFn (req, res, next) {
    if (!/^\/api\//.test(req.path)) {
        // we don't need authorization for static calls
        next();
        return;
    }

    let cookie = req.cookies[COOKIE_NAME];
    const userData = Token.verify(cookie);
    // console.log(`URL: ${req.path}, userId: ${userData.userId}`);
    _enrichRequestAndResponse(req, res, userData);
    next();
}

function _enrichRequestAndResponse (req, res, userData) {
    if (userData) {
        // TODO add time to the session cookie
        req.userId = userData.userId;
        res.cookie(COOKIE_NAME, Token.generate(userData.userId), {httpOnly: true, maxAge: COOKIE_MAX_AGE});
    } else {
        res.clearCookie(COOKIE_NAME);
    }
}
