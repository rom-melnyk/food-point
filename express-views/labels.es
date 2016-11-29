const { getLabels } = require('../services/labels.es');

function labelsPage(req, res) {
    getLabels()
        .then(data => { res.render('labels', data); })
        .catch(data => { res.render('labels', data); })
}

module.exports = { labelsPage };
