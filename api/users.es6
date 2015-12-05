const doResponse = require('./response-wrapper.es6').doResponse;
const escape = require('./mysql-shim.es6').escape;
const authentication = require('./authentication.es6');
const Session = require('./session.es6');

function getUsers (req, res) {
    doResponse('SELECT * from users', res);
}

function getUserById (req, res) {
    const authId = escape(req.params.id);
    doResponse(`SELECT * FROM users WHERE authId="${authId}"`, res);
}

function createUser (req, res) {

}

function getMyData (req, res) {
    // we expect `session` middleware to take care about `userId`
    if (!req.userId) {
        res.json({error: true, message: 'Not authenticated', debug: null});
    } else {
        doResponse(`SELECT * FROM users WHERE authId="${req.userId}"`, res);
    }
}

function authenticate (req, res) {
    const authType = escape(req.body.authType);
    if (authType === 'facebook') {
        const userId = escape(req.body.userId);
        const accessToken = escape(req.body.accessToken);

        authentication
            .facebookAuthenticate(userId, accessToken)
            .then(
                (result) => {
                    if (res.error) {
                        res.json(result);
                    } else {
                        Session.enrichRequestAndResponse(req, res, result.authId);
                        res.json(result);
                    }
                },
                (error) => {
                    res.json(error);
                }
            );
    } else {
        res.json({error: true, message: 'Wrong authentication type', debug: null})
    }
}

module.exports = {
    getUsers,
    getMyData,
    authenticate
 };
