/**
 * @date Tue Feb  9 23:34:55 CET 2016
 */

'use strict';

const Crypto = require('crypto');
const SECRET = require('../config.json').session.secret;
const MAX_DURATION = require('./session-duration.es6').duration;

const MD5_LENGTH = 32;
const RANDOM_LENGTH = 5;
const DATE_LENGTH = 13; // console.log( (Date.now() + '').length );

const Token = {
    /**
     * @param {String} userId
     * @param {*} [...params]           other optional params to generate tokens from (e.g., `timestamp`)
     */
    generate: _generateToken,

    /**
     * @param {String} token
     * @return {{hash: String|null, userId: String|null, ...}}      other key-value pairs are welcome
     */
    parse: _parseToken,

    /**
     * @param {Object} parsed           same what {@link #parse} returns
     * @return {Boolean}
     */
    verify: _verifyParsedToken
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

function  _generateHash (userId, random, date) {
    return _md5(userId + SECRET + random + date);
}

function  _generateToken (userId, random, date) {
    if (!random) {
        random = _generateRandom();
    }
    if (!date) {
        date = Date.now();
    }
    return _hex(_generateHash(userId, random, date) + random + date + userId);
}

function _parseToken (token) {
    const result = {
        hash: null,
        random: null,
        date: null,
        userId: null
    };

    if (typeof token === 'string') {
        token = _unhex(token);
        result.hash = token.substr(0, MD5_LENGTH);
        result.random = token.substr(MD5_LENGTH, RANDOM_LENGTH);
        result.date = Number( token.substr(MD5_LENGTH + RANDOM_LENGTH, DATE_LENGTH) );
        result.userId = token.substr(MD5_LENGTH + RANDOM_LENGTH + DATE_LENGTH);
    }

    return result;
}

function _verifyParsedToken (parsed) {
    if (!parsed) {
        return false;
    }

    if (!parsed.date || parsed.date < Date.now() - MAX_DURATION) {
        return false;
    }

    return _generateHash(parsed.userId, parsed.random, parsed.date) === parsed.hash;
}
