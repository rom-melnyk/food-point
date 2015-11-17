const doQuery = require('./mysql-shim.es6');

function getUsers (req, res) {
    doQuery('select * from users')
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            res.json({error: true, message: 'Server error', debug: err});
        });
}

function getUserByEmail (req, res) {
    let email = req.params.email;
    // TODO ensure the string is injection-safe
    doQuery(`select * from users where email="${email}"`)
        .then((rows) => {
            res.json(rows);
        }).catch((err) => {
            res.json({error: true, message: 'Server error', debug: err});
        });
}

function createUser (req, res) {

}

module.exports = {
    getUsers
 };
