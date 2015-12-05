'use strict';
const Token = require('./token.es6');

const COOKIE_NAME = 'session';
const COOKIE_MAX_AGE = 24 * 60 * 60 * 1000; // 1 day

module.exports = {
    // we respect the principle that other middleware use, say `app.use(cookieParser());`
    session: () => _sessionFn,
    enrichRequestAndResponse: _enrichRequestAndResponse
};

// -------------------------- private methods --------------------------
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
