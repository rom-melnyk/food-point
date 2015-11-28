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
    const modalWrapper = document.createElement('div');
    const modalWindow = document.createElement('div');
    const closeButton = document.createElement('div');
    const container = document.createElement('div');

    const close = (e) => {
        dom(shader).removeClass('appear');
        dom(modalWindow).removeClass('appear');
        setTimeout(() => {
            document.body.removeChild(shader);
        }, 300);
    };

    shader.className = 'modal-shader';
    modalWrapper.className = 'modal-wrapper';
    modalWindow.className = 'modal-window';
    closeButton.className = 'icon-back';
    container.className = 'modal-content';

    closeButton.addEventListener('click', close);

    modalWindow.appendChild(closeButton);
    modalWindow.appendChild(container);
    modalWrapper.appendChild(modalWindow);
    shader.appendChild(modalWrapper);

    document.body.appendChild(shader);

    setTimeout(() => {
        dom(shader).addClass('appear');
        dom(modalWindow).addClass('appear');
    }, 10);

    return {
        container,
        close
    };
}
