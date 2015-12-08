const doResponse = require('./response-wrapper.es6').doResponse;
const escape = require('./mysql-shim.es6').escape;

function getDishes(req, res) {
    doResponse('SELECT * FROM dishes;', res);
}

function getDishById(req, res) {
    const id = escape(req.params.id);
    doResponse(`SELECT * FROM dishes WHERE id="${id}";`, res, true);
}

function createDish(req, res) {
    const name = escape(req.body.name);
    const price = escape(req.body.price);
    const query = `INSERT INTO dishes (name, price, attr) VALUES ("${name}", "${price}", "");`;
    doResponse(query, res);
}

function updateDish(req, res) {
    const id = escape(req.params.id);
    const name = escape(req.body.name);
    const price = escape(req.body.price);
    const attr = escape(req.body.attr);
    const query = `UPDATE dishes SET name="${name}", price="${price}", attr="${attr}" WHERE id="${id}";`;
    doResponse(query, res);
}

function deleteDish(req, res) {
    const id = escape(req.params.id);
    const query = `DELETE FROM dishes WHERE id="${id}";`;
    doResponse(query, res);
}

module.exports = {
    createDish,
    getDishes,
    getDishById,
    updateDish,
    deleteDish
};
