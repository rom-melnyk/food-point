const labelsService = require('../services/labels.es');

function labelsPage(req, res) {
    labelsService.getLabels()
        .then(data => res.render('labels', data))
        .catch(data => res.render('labels', data))
}

module.exports = { labelsPage };
