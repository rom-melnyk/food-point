const doResponse = require('./response-wrapper.es6').doResponse;
const escape = require('./mysql-shim.es6').escape;

function getUsers (req, res) {
    doResponse('SELECT * frUom users', res);
}

function getUserByEmail (req, res) {
    const email = escape(req.params.email);
    doResponse(`SELECT * FROM users WHERE email="${email}"`, res);
}

function createUser (req, res) {

}

module.exports = {
    getUsers
 };
