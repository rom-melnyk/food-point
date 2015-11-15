const mysql = require('mysql');
const pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'food_point',
    debug    :  false
});

/**
 * @return Promise
 */
function doQuery (query) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                connection.release();
                reject({error: true, message: 'Error connecting to database', debug: err});
                return;
            }

            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    reject({error: true, message : 'Error querying the database', debug: err});
                } else {
                    resolve(rows);
                }
            });

            connection.on('error', (err) => {
                reject({error: true, message : 'Error connecting to database', debug: err});
            });
        });
    });
}

module.exports = {
    doQuery
};
