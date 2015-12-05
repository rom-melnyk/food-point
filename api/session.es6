'use strict';
const Token = require('./token.es6');

const COOKIE_NAME = 'session';
const COOKIE_MAX_AGE = 30 * 1000; // TODO add meaningful value

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
    const userId = Token.verify(cookie);
    _enrichRequestAndResponse(req, res, userId);
    next();
}

function _enrichRequestAndResponse (req, res, userId) {
    if (userId) {
        // TODO add time to the session cookie
        req.userId = userId.userId;
        res.cookie(COOKIE_NAME, Token.generate(userId.userId), {httpOnly: true, maxAge: COOKIE_MAX_AGE});
    } else {
        res.clearCookie(COOKIE_NAME);
    }
}
