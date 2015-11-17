const doResponse = require('./response-wrapper.es6').doResponse;

function getDishes(req, res) {
    doResponse('SELECT * FROM dishes;', res);
}

function getDishById(req, res) {
    let id = req.params.id;
    // TODO ensure the string is injection-safe
    doResponse(`SELECT * FROM dishes WHERE id="${id}";`, res);
}

function createDish(req, res) {
    let params = req.body;
    let query = `INSERT INTO dishes (name, price, attr) VALUES ("${params.name}","${params.price}","");`;
    doResponse(query, res);
}

module.exports = {
    createDish,
    getDishes,
    getDishById
};
