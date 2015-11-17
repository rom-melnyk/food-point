const doResponse = require('./response-wrapper.es6').doResponse;

function getUsers (req, res) {
    doResponse('SELECT * frUom users', res);
}

function getUserByEmail (req, res) {
    let email = req.params.email;
    // TODO ensure the string is injection-safe
    doResponse(`SELECT * FROM users WHERE email="${email}"`, res);
}

function createUser (req, res) {

}

module.exports = {
    getUsers
 };
