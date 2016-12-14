const Ajax = require('../transports/ajax.es');

function uploadPicture(form) {
    if (!form) {
        return;
    }

    return Ajax.post(form.getAttribute('action'), form.querySelector('input').files[0])
        .then(console.log)
        .catch(console.error);
}

module.exports = { uploadPicture };
