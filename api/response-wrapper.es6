const doQuery = require('./mysql-shim.es6').doQuery;

/**
 * @param {String} query
 * @param {Object} response
 */
function doResponse (query, response) {
    doQuery(query)
        .then((rows) => {
            response.json(rows);
        })
        .catch((err) => {
            response.json({error: true, message: 'Server error', debug: err});
        });
}

module.exports = {
    doResponse
};
