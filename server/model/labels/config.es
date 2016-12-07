const _ = require('lodash');

const fields = {
    id: 'number',
    name: 'string'
};

const actions = {
    get: {
        roles: '*',
        errorMessage: '[${MODULE_NAME}]: Adding label "${name}" failed. Error message:',
        expects: {},
        returns: fields
    }
};
