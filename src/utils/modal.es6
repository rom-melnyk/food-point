const dom = require('./dom.es6');

const Modal = {
    open: _open
};

module.exports = Modal;

// -------------------------------- private methods --------------------------------
/**
 * @return {{container: {Element}, close: {Function}}}
 */
function _open () {
    const shader = document.createElement('div');
    const modalWindow = document.createElement('div');
    const closeButton = document.createElement('div');
    const container = document.createElement('div');

    const close = (e) => {
        dom(modalWindow).removeClass('appear');
        setTimeout(() => {
            dom(shader).removeClass('appear');
        }, 100);
        setTimeout(() => {
            document.body.removeChild(modalWindow);
            document.body.removeChild(shader);
        }, 500);
    };

    shader.className = 'modal-shader';
    modalWindow.className = 'modal-window';
    closeButton.className = 'icon-delete';
    container.className = 'modal-content';

    modalWindow.appendChild(closeButton);
    modalWindow.appendChild(container);

    closeButton.addEventListener('click', close);

    document.body.appendChild(shader);
    document.body.appendChild(modalWindow);
    dom(shader).addClass('appear');
    dom(modalWindow).addClass('appear');

    return {
        container,
        close
    };
}
