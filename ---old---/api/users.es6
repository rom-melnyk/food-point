const doResponse = require('./response-wrapper.es6').doResponse;
const escape = require('./mysql-shim.es6').escape;
const authentication = require('./authentication.es6');
const Session = require('./session.es6');

// For most methods we expect `session` middleware to take care about `req.userId`

function getUsers (req, res) {
    if (!req.userId) {
        res.json({error: true, message: 'Not authenticated', debug: null});
    } else {
        doResponse('SELECT * from users', res);
    }
}

function getUserById (req, res) {
    if (!req.userId) {
        res.json({error: true, message: 'Not authenticated', debug: null});
    } else {
        const id = escape(req.params.id);
        doResponse(`SELECT * FROM users WHERE id="${id}"`, res, true);
    }
}

function getMyData (req, res) {
    if (!req.userId) {
        res.json({error: true, message: 'Not authenticated', debug: null});
    } else {
        doResponse(`SELECT * FROM users WHERE id="${req.userId}"`, res, true);
    }
}

function updateUser(req, res) {
    if (!req.userId) {
        res.json({error: true, message: 'Not authenticated', debug: null});
    } else {
        const id = escape(req.params.id);
        const name = escape(req.body.name);
        const address = escape(req.body.address);
        const email = escape(req.body.email);
        const phone = escape(req.body.phone);
        const query = 'UPDATE users SET ' +
            `name="${name}", address="${address}", email="${email}" , phone="${phone}" ` +
            `WHERE id="${id}";`;

        doResponse(query, res);
    }
}

function deleteUser(req, res) {
    if (!req.userId) {
        res.json({error: true, message: 'Not authenticated', debug: null});
    } else {
        const id = escape(req.params.id);
        const query = `DELETE FROM users WHERE id="${id}";`;
        doResponse(query, res);
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
                    if (result.error) {
                        res.json(result);
                    } else {
                        Session.enrichRequestAndResponse(req, res, {userId: result.id});
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
    getUserById,
    getMyData,
    updateUser,
    deleteUser,
    authenticate
 };
