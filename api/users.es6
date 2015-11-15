var mysqlShim = require('./mysql-shim.es6');

function getUsers (req, res) {
    mysqlShim.doQuery('select * from users')
        .then((rows) => {
            res.json(rows);
        })
        .catch((obj) => {
            res.json(obj);
        });
}

module.exports = {
     getUsers
 };
