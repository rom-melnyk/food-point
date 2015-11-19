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
                    resolve({error: true, message: 'Error querying the database', debug: err});
                } else {
                    resolve(rows);
                }
            });

            connection.on('error', (err) => {
                resolve({error: true, message: 'Error connecting to database', debug: err});
            });
        });
    });
}

/**
 * @param {String} string
 * @return {String}
 */
function escape (string) {
    return (string + '').replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
        switch (char) {
            case '\0':
                return '\\0';
            case '\x08':
                return '\\b';
            case '\x09':
                return '\\t';
            case '\x1a':
                return '\\z';
            case '\n':
                return '\\n';
            case '\r':
                return '\\r';
            case '"':
            case '\'':
            case '\\':
            case '%':
            default:
                return '\\' + char; // prepends a backslash to backslash, percent, and double/single quotes
        }
    });
}

module.exports = {
    doQuery,
    escape: mysql.escape
};
