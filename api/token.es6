'use strict';

const Crypto = require('crypto');
const SECRET = require('../config.json').session.secret;

const RANDOM_LENGTH = 5;

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

function _generateRandom () {
    let rnd = '';

    for (let i = 0; i < RANDOM_LENGTH; i++) {
        rnd += Math.floor(Math.random() * 10);
    }

    return rnd;
}

function  _generateHash (userId, random) {
    return _md5(userId + SECRET + random);
}

function  _generateToken (userId, random) {
    if (!random) {
        random = _generateRandom();
    }
    return _hex(_generateHash(userId, random) + random + userId);
}

function _parseToken (token) {
    const result = {
        hash: null,
        random: null,
        userId: null
    };

    if (typeof token === 'string') {
        token = _unhex(token);
        result.hash = token.substr(0, 32);
        result.random = token.substr(32, RANDOM_LENGTH);
        result.userId = token.substr(32 + RANDOM_LENGTH);
    }

    return result;
}

function _verifyToken (token) {
    if (typeof token !== 'string') {
        return false;
    }

    let parsed = _parseToken(token);
    return _generateHash(parsed.userId, parsed.random) === parsed.hash ? {userId: parsed.userId} : false;
}

