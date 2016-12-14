const picturesService = require('../../services/pictures.es');

function init() {
    if (location.pathname !== '/pictures') {
        return;
    }

    const form = document.querySelector('form');
    const submitButton = form.querySelector('.button.submit');
    submitButton.addEventListener('click', e => {
        picturesService.uploadPicture(form);

        e.stopPropagation();
        return false;
    })
}

module.exports = { init };
