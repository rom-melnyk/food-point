'use strict';

const Crypto = require('crypto');

const SECRET = 'FoodPoint is awesome!';
const Token = {
    /**
     * @param {String} userId
     */
    generate: _generateToken,

    /**
     * @param {String} token
     * @return {{userId: String|null, hash: String|null}}
     */
    parse: _parseToken,

    /**
     * @param {String} token
     * @return {{userId: String}|Boolean}
     */
    verify: _verifyToken
};

module.exports = Token;

// --------------------------- private methods ---------------------------
function _md5 (string) {
    const hash = Crypto.createHash('md5');
    hash.update(string, 'utf8');
    return hash.digest('hex');
}

function _hex (string) {
    let hex = '';

    for (let i = 0; i < string.length; i++) {
        hex += string.charCodeAt(i).toString(16);
    }

    return hex;
}

function _unhex (string) {
    let value = '';
    let charCode;

    for (let i = 0; i < string.length; i += 2) {
        charCode = parseInt(string.substr(i, 2), 16);
        if (isNaN(charCode) || charCode < 32 || charCode > 128) {
            continue;
        }
        value += String.fromCharCode(charCode);
    }

    return value;
}

function  _generateHash (userId) {
    return _md5(userId + SECRET);
}

function  _generateToken (userId) {
    return _hex(_generateHash(userId) + userId);
}

function _parseToken (token) {
    const result = {
        hash: null,
        userId: null
    };

    if (typeof token === 'string') {
        token = _unhex(token);
        result.hash = token.substr(0, 32);
        result.userId = token.substring(32);
    }

    return result;
}

function _verifyToken (token) {
    if (typeof token !== 'string') {
        return false;
    }

    let parsed = _parseToken(token);
    return _generateHash(parsed.userId) === parsed.hash ? {userId: parsed.userId} : false;
}

