const doQuery = require('./mysql-shim.es6');

function getDishes(req, res) {
    doQuery('SELECT * FROM dishes;')
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
    doQuery(`SELECT * FROM dishes WHERE id="${id}";`)
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            res.json({error: true, message: 'Server error', debug: err});
        });
}

function createDish(req, res) {
    let params = req.body;
    let query = `INSERT INTO dishes (name, price, attr) VALUES ("${params.name}","${params.price}","");`;
    doQuery(query)
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            res.json({error: true, message: 'Server error', debug: err});
        });
}

module.exports = {
    createDish,
    getDishes,
    getDishById
};
