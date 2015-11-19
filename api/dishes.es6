const doResponse = require('./response-wrapper.es6').doResponse;
const escape = require('./mysql-shim.es6').escape;

function getDishes(req, res) {
    doResponse('SELECT * FROM dishes;', res);
}

function getDishById(req, res) {
    const id = escape(req.params.id);
    doResponse(`SELECT * FROM dishes WHERE id="${id}";`, res);
}

function createDish(req, res) {
    const name = escape(req.body.name);
    const price = escape(req.body.price);
    const query = `INSERT INTO dishes (name, price, attr) VALUES ("${name}", "${price}", "");`;
    doResponse(query, res);
}

module.exports = {
    createDish,
    getDishes,
    getDishById
};
