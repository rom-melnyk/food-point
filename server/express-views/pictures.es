const picturesService = require('../services/pictures.es');

function picturesPage(req, res) {
    picturesService.getPictures()
        .then(data => res.render('pictures', data))
        .catch(data => res.render('pictures', data))
}

module.exports = { picturesPage };
