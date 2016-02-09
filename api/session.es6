'use strict';
const Token = require('./token.es6');
const COOKIE_MAX_AGE = require('./session-duration.es6').duration;

const COOKIE_NAME = 'session';
const URL_MASK = /^\/api\//;

module.exports = {
    // we respect the principle that other middleware use, say `app.use(cookieParser());`
    session: () => _sessionFn,
    enrichRequestAndResponse: _enrichRequestAndResponse
};

// -------------------------- private methods --------------------------
function _sessionFn (req, res, next) {
    if (!URL_MASK.test(req.path)) {
        // we don't need authorization for static calls
        next();
        return;
    }

    let cookie = req.cookies[COOKIE_NAME];
    const parsedData = Token.parse(cookie);

    // console.log(`URL: ${req.path}`);
    // console.log(parsedData);
    if (Token.verify(parsedData)) {
        _enrichRequestAndResponse(req, res, parsedData);
    } else {
        res.clearCookie(COOKIE_NAME);
    }

    next();
}

function _enrichRequestAndResponse (req, res, parsedData) {
    req.userId = parsedData.userId;
    res.cookie(COOKIE_NAME, Token.generate(parsedData.userId), {httpOnly: true, maxAge: COOKIE_MAX_AGE});
}
