import React from 'react';
import ReactDom from 'react-dom';
import { getState, addChangeListener, removeChangeListener } from '../../state.es6';
import { setModalCommand } from '../../actions.es6';
import dom from '../../utils/dom.es6';

import EditDish from '../dishes/edit-dish.es6';
import DeleteDish from '../dishes/delete-dish.es6';
import EditMe from '../header/edit-me.es6';

const Modal = React.createClass({
    getInitialState () {
        return {command: getState().modals[this.props.name]};
    },

    componentDidMount () {
        const shader = dom( ReactDom.findDOMNode(this) ).parent();
        this._$shader = shader;
        setTimeout(() => {
            shader.addClass('appear');
        }, 1);

        addChangeListener(this._getState);
    },

    componentWillUpdate (newProps, newState) {
        if (newState.command === 'close') {
            this._onCloseHandler();
        }
    },

    componentWillUnmount () {
        removeChangeListener(this._getState);
        setModalCommand(this.props.name, null);
    },

    render () {
        const payload = _getModal(this.props.name, this.props.data);
        return (
            <div className="modal-wrapper">
                <div className={'modal-window' + (this.state.command === 'wait' ? ' wait' : '')}>
                    <div className="close" onClick={this._onCloseHandler} title="Закрити"></div>
                    <div className="wait-indicator"></div>
                    <div className="modal-container">
                        {payload}
                    </div>
                </div>
            </div>
        );
    },

    _getState (state) {
        this.setState({
            command: state.modals[this.props.name]
        });
    },

    _$shader: null,

    _onCloseHandler () {
        this._$shader.removeClass('appear');
        const shader = this._$shader[0];
        setTimeout(() => {
            ReactDom.unmountComponentAtNode(shader);
            document.body.removeChild(shader);
        }, 300); // respect the animation
    }
});

export default {
    open: _open
}

// -------------------------------- private methods --------------------------------
function _open (name, data = {}) {
    const shader = document.createElement('div');
    shader.className = 'modal-shader';
    document.body.appendChild(shader);

    ReactDom.render(<Modal name={name} data={data}/>, shader);
}

function _getModal (name, data) {
    if (name === 'edit-dish') {
        return <EditDish {...data} />;
    }
    if (name === 'delete-dish') {
        return <DeleteDish {...data} />;
    }

    if (name === 'edit-me') {
        return <EditMe data={data} />;
    }

    return null;
}
