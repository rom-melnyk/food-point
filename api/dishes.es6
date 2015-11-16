const doQuery = require('./mysql-do-query.es6');

function getDishes(req, res) {
    doQuery('select * from dishes')
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            res.json({error: true, message: 'Server error', debug: err});
        });
}

function getDishById(req, res) {
    let id = req.params.id;
    // TODO ensure the string is injection-safe
    doQuery(`select * from dishes where id="${id}"`)
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            res.json({error: true, message: 'Server error', debug: err});
        });
}

function createDish(req, res) {

}

module.exports = {
    createDish,
    getDishes,
    getDishById
};
