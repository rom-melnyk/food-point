const picturesService = require('../services/pictures.es');

function uploadPicture(req, res) {
    picturesService.uploadPicture(req.file)
        .then(data => res.json(data))
        .catch(data => res.json(data))
}

function getPictures(req, res) {
    picturesService.getPictures()
        .then(data => res.json(data))
        .catch(data => res.json(data));
}

module.exports = { uploadPicture, getPictures };
