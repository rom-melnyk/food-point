const mysql = require('mysql');
const config = require('../config.json');

const MODULE_NAME = 'MySQL';

const pool = mysql.createPool({
    connectionLimit: 100, // important
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    debug: false
});

/**
 * @param {String|Object} query
 * @param {Array} [fields]
 * @return Promise
 */
function doQuery(query, fields) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                connection && connection.release();
                reject({ message: 'Error getting the connecting to database', debug: err });
                return;
            }

            let queryString;
            let args = [
                query,
                fields,
                (err, rows) => {
                    connection.release();
                    if (err) {
                        if (!config.isProduction) {
                            console.error(`[${MODULE_NAME}] query\n| ${queryString}\nfailed. Error message:`);
                            console.error(err);
                            console.log('\n');
                        }

                        reject({ message: 'Error querying the database', debug: err });
                    } else {
                        if (!config.isProduction) {
                            console.info(`[${MODULE_NAME}] ok: ${queryString}`);
                        }
                        resolve(rows);
                    }
                }
            ].filter(arg => !!arg);

            queryString = connection.query.apply(connection, args).sql;
            args = null;

            connection.on('error', (err) => {
                reject({ message: 'Error connecting to database', debug: err });
            });
        });
    });
}

/**
 * @param {String} string
 * @return {String}
 */
function escape(string) {
    string = string ? string + '' : '';
    return string.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
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

module.exports = { doQuery, escape };
