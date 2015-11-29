import React from 'react';
import ReactDom from 'react-dom';
import { getState, addChengeListener, removeChengeListener } from '../../state.es6';
import dom from '../../utils/dom.es6';

const Modal = React.createClass({
    componentDidMount () {
        const shader = dom( ReactDom.findDOMNode(this) ).parent();
        this._$shader = shader;
        setTimeout(() => {
            shader.addClass('appear');
        }, 1);
    },

    render () {
        return (
            <div className="modal-wrapper">
                <div className="modal-window">
                    <div className="close" onClick={_getCloseHandler(this)}></div>
                    <div className="wait-indicator"></div>
                    <div className="modal-container">
                        Test String
                    </div>
                </div>
            </div>
        );
    },

    _$shader: null
});

export default {
    open: _open
}

// -------------------------------- private methods --------------------------------
function _open () {
    const shader = document.createElement('div');
    shader.className = 'modal-shader';
    document.body.appendChild(shader);

    ReactDom.render(<Modal />, shader);
}

/**
 * @return {{container: {Element}, close: {Function}}}
 */
//function _open2 () {
//    closeButton.addEventListener('click', _close, true);
//    shader.addEventListener('click', (e) => {
//        if (e.target === e.currentTarget || e.target === modalWrapper) {
//            _close(e);
//            e.stopPropagation();
//        }
//    }, true);
//
//    return {
//        container,
//        startWaiting: () => {
//            dom(modalWindow).addClass('wait');
//        },
//        stopWaiting: () => {
//            dom(modalWindow).removeClass('wait');
//        },
//        close: () => {
//            return new Promise((resolve) => {
//                _close(null, resolve);
//            });
//        }
//    };
//}

function _getCloseHandler (component) {
    return (/*e, callback*/) => {
        component._$shader.removeClass('appear');
        setTimeout(() => {
            ReactDom.unmountComponentAtNode(component._$shader[0]);
            document.body.removeChild(component._$shader[0]);
            //if (typeof callback === 'function') {
            //    callback();
            //}
        }, 300); // respect the animation
    };

}
