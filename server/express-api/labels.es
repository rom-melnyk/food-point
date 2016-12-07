const _ = require('lodash');
const labelsService = require('../services/labels.es');

function addLabel(req, res) {
    const { name, icon } = _.pick(req.body, ['name', 'icon']);
     labelsService.addLabel({ name, icon })
        .then((data) => { res.json(data); })
         .catch((data) => { res.json(data); });
}

function getLabels(req, res) {
    labelsService.getLabels()
        .then((data) => { res.json(data); })
        .catch((data) => { res.json(data); });
}

function getLabel(req, res) {
    labelsService.getLabel(req.params.id)
        .then((data) => { res.json(data); })
        .catch((data) => { res.json(data); });
}

function removeLabel(req, res) {
    labelsService.removeLabel(req.params.id)
        .then((data) => { res.json(data); })
        .catch((data) => { res.json(data); });
}

function editLabel(req, res) {
    const params = _.assign({ id: req.params.id }, _.pick(req.body, ['name', 'icon']));
    labelsService.editLabel(params)
        .then((data) => { res.json(data); })
        .catch((data) => { res.json(data); });
}

module.exports = { addLabel, getLabels, getLabel, removeLabel, editLabel };
