const mysql = require('mysql');
const config = require('../package.json').config.mysql;
const pool = mysql.createPool({
    connectionLimit: 100, //important
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    debug: false
});

/**
 * @param {String} query
 * @return Promise
 */
function doQuery (query) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                connection.release();
                resolve({error: true, message: 'Error getting the connecting to database', debug: err});
                return;
            }

            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    resolve({error: true, message : 'Error querying the database', debug: err});
                } else {
                    resolve(rows);
                }
            });

            connection.on('error', (err) => {
                resolve({error: true, message : 'Error connecting to database', debug: err});
            });
        });
    });
}

module.exports = doQuery;
