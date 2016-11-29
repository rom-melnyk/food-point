const doQuery = require('./mysql-shim.es6').doQuery;

/**
 * @param {String} query
 * @param {Object} response
 * @param {Boolean} [expectSingleObject=false]
 */
function doResponse (query, response, expectSingleObject) {
    doQuery(query, expectSingleObject)
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
