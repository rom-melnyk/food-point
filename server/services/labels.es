const _ = require('lodash');
const { wrapResponse } = require('../utils/api-response.es');

const formatters = require('../model/labels/server-formatter.es');

const mysql = require('../transports/mysql.es');

const MODULE_NAME = 'Labels';
const TABLE = 'labels';

function addLabel({ name, icon }) {
    if (!formatters.isInputValid({ name, icon })) {
        return Promise.reject( wrapResponse(400, 'Bad name or icon') );
    }

    return mysql.doQuery(`INSERT INTO ${TABLE} (name, icon) VALUES (?, ?);`, [name, icon])
        .then(rows => rows && rows.insertId !== undefined
            ? wrapResponse(true)
            : wrapResponse(500, 'Failed adding a label', rows)
        )
        .catch(_error);
}

function getLabels() {
    return mysql.doQuery(`SELECT * FROM ${TABLE};`)
        .then(rows => wrapResponse(rows))
        .catch(_error);
}

function getLabel(id) {
    return mysql.doQuery(`SELECT * FROM ${TABLE} WHERE id = ?;`, [id])
        .then(rows => wrapResponse(rows))
        .catch(_error);
}

function removeLabel(id) {
    return mysql.doQuery(`DELETE FROM ${TABLE} WHERE id = ?;`, [id])
        .then(rows => rows && rows.affectedRows
            ? wrapResponse(true)
            : wrapResponse(500, 'Failed removing a label', rows)
        )
        .catch(_error);
}

function editLabel({ id, name, icon }) {
    return mysql.doQuery(`UPDATE ${TABLE} SET name = ?, icon = ? WHERE id = ?;`, [name, icon, id])
        .then(rows => rows && rows.affectedRows
            ? wrapResponse(true)
            : wrapResponse(500, 'Failed editing a label', rows)
        )
        .catch(_error);
}

// function editLabels(labels) {
//     return mysql.doQuery(`DELETE FROM ${TABLE} WHERE id = ?;`, [id])
//         .then(rows => {
//             const values = store.editValues(TABLE, labels);
//             resolve(wrapResponse(values));
//         }).catch(_error);
// }

module.exports = {
    addLabel,
    getLabels,
    getLabel,
    removeLabel,
    editLabel
};


// -------------------------- private methods --------------------------
function _error(e) {
    return wrapResponse(500, 'Database error', e);
}
