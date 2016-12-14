const fs = require('fs');
const path = require('path');

const mysql = require('../transports/mysql.es');
const { wrapResponse } = require('../utils/api-response.es');

const MODULE_NAME = 'Pictures';
const TABLE = 'pictures';
const ERROR_TYPES = {
    FS: 'FileSystem error',
    DATABASE: 'Database error',
    ETC: 'Other error'
};

function uploadPicture(filesObj) {
    if (!filesObj || !filesObj.path) {
        return Promise.reject(
            _error(ERROR_TYPES.FS, 'multipart/form-data parsing error')
        );
    }

    let newName = `${Date.now()}-${filesObj.originalname}`;
    if (newName.length > 100) { // DB limitations; name.length <= 100
        const lastDotPos = newName.lastIndexOf('.');
        const ext = newName.substr(lastDotPos);
        newName = newName.substr(0, 100 - ext.length) + ext;
    }
    const newPath = path.join(filesObj.destination, newName);

    return new Promise((resolve, reject) => {
        fs.rename(filesObj.path, newPath, err => {
            if (err) {
                reject([ERROR_TYPES.FS, {filesObj, newPath}]);
            }
            resolve();
        });
    })
    .then(() => mysql.doQuery(`INSERT INTO ${TABLE} (name) VALUES (?);`, [newName]))
    .then(rows => rows && rows.insertId !== undefined
        ? wrapResponse({name: newName})
        : _error(ERROR_TYPES.DATABASE, `Failed adding the recod to the database: file is "${newName}"`)
    )
    // intercepts both forced reject from `fs.rename()` and unexpected mistakes
    .catch(args => args && args.length === 2
        ? _error.apply(null, args)
        : _error(ERROR_TYPES.ETC, args)
    );
}

function getPictures() {
    return mysql.doQuery(`SELECT * FROM ${TABLE};`)
        .then(rows => {
            // const values = store.getValues(TABLE);
            return wrapResponse(rows);
        })
        .catch(e => _error(ERROR_TYPES.DATABASE, e));
}


module.exports = { uploadPicture, getPictures };


// -------------------------- private methods --------------------------
function _error(type, e) {
    return wrapResponse(500, type, e);
}
