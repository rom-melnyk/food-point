'use strict';

const https = require('https');
const MySQL = require('./mysql-shim.es6');

/**
 * @param {String} userId
 * @param {String} accessToken
 * @returns {Promise}
 */
function facebookAuthenticate (userId, accessToken) {
    const facebookData = {
        authId: null,
        name: null,
        authType: 'facebook'
    };

    return doFacebookRequest(accessToken)
        .then((result) => {
            if (result.error) {
                return result;
            } else if (result && result.id === userId) {
                facebookData.authId = result.id;
                facebookData.name = result.name;
                return facebookData;
            } else {
                return {error: true, message: 'userId/accessToken pair does not match', debug: null};
            }
        }).then((result) => {
            return result.error ? result : doGetUserByAuthIdQuery(facebookData);
        }).then((result) => {
            if (result.error) {
                return result;
            } else if (result.id === undefined) {
                return doCreateUserQuery(facebookData);
            } else {
                return result;
            }
        });
}

module.exports = {
    facebookAuthenticate
};

// -------------------------- private methods --------------------------

function doFacebookRequest (accessToken) {
    const url = `https://graph.facebook.com/v2.5/me?access_token=${accessToken}`;

    return new Promise ((resolve, reject) => {
        https.get(url, (response) => {
            let body = '';
            response.on('data', (chunk) => {
                body += chunk;
            });
            response.on('end', () => {
                let result = null;
                try {
                    result = JSON.parse(body);
                } catch (e) {}

                resolve(result);
            });
        }).on('error', (err) => {
            resolve({error: true, message: 'Error server-to-server Facebook auth check', debug: err});
        });
    });
}

function doGetUserByAuthIdQuery (data) {
    return MySQL.doQuery(`SELECT * FROM users WHERE authId="${data.authId}" AND authType="${data.authType}"`);
}

function doCreateUserQuery (data) {
    const query = 'INSERT INTO users (name, authId, authType) ' +
        `VALUES ("${MySQL.escape(data.name)}", "${data.authId}", "${data.authType}")`;

    return MySQL.doQuery(query)
        .then((result) => {
            return result.error ? result : doGetUserByAuthIdQuery(data);
        }).then((result) => {
            return result.error || result.length === 0
                ? {error: true, message: 'Error creating user', debug: result.debug}
                : result[0];
        });
}
