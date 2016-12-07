const ModelHelpers = require('../../utils/model.es');
const Label = require('./label.es');

function isInputValid(data) {
    return true;
}

function isOutputValid(data) {
    return ModelHelpers.doesObjectContainKeys(data, Label.FIELDS);
}

module.exports = { isInputValid, isOutputValid };
