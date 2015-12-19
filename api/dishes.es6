const doResponse = require('./response-wrapper.es6').doResponse;
const escape = require('./mysql-shim.es6').escape;

const FIELDS = ['name', 'price', 'description', 'image', 'isVisible', 'children'];

function getDishes(req, res) {
    doResponse('SELECT * FROM dishes;', res);
}

function getDishById(req, res) {
    const id = escape(req.params.id);
    doResponse(`SELECT * FROM dishes WHERE id="${id}";`, res, true);
}

function createDish(req, res) {
    const values = FIELDS.map((fld) => {
        return `"${escape(req.body[fld])}"`;
    });
    const query = `INSERT INTO dishes (${FIELDS.join(', ')}) VALUES (${values.join(', ')});`;
    doResponse(query, res);
}

function updateDish(req, res) {
    const id = escape(req.params.id);

    const paramList = FIELDS.map((fld) => {
        return `${fld}="${escape(req.body[fld])}"`;
    });

    const query = `UPDATE dishes SET ${paramList.join(', ')} WHERE id="${id}";`;
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
