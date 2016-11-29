const _ = require('lodash');

const state = {};


function getState(pathToArea) {
    return pathToArea ? _.get(state, pathToArea) : state;
}


function addValue(pathToArea, value) {
    let values = _.get(state, pathToArea);
    if (!values) {
        values = [];
        _.set(state, pathToArea, values);
    }
    values.push(value);
    return values;
}


function getValue(pathToArea, id) {
    const values = _.get(state, pathToArea);
    return _.find(values, v => v.id === id);
}


function getValues(pathToArea) {
    return _.get(state, pathToArea);
}


function editValue(pathToArea, id, value) {
    const oldValue = getValue(pathToArea, id);
    if (!oldValue) {
        value = _.assign({ id }, value);
        addValue(pathToArea, value);
    } else {
        value = _.assign(oldValue, value);
    }
    return value;
}


function editValues(pathToArea, values) {
    _.forEach(values, (value) => {
        editValue(pathToArea, value.id, value);
    });
    return getValues(pathToArea);
}


function removeValue(pathToArea, id) {
    const values = _.get(state, pathToArea);
    _.remove(values, v => v.id === id);
    return values;
}


module.exports = { getState, addValue, getValue, getValues, editValue, editValues, removeValue };
