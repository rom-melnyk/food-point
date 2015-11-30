import React from 'react';
import ReactDom from 'react-dom';
import { getState, addChangeListener, removeChangeListener } from '../../state.es6';
import { setModalCommand } from '../../actions.es6';
import EditDish from '../dishes/edit-dish.es6';
import DeleteDish from '../dishes/delete-dish.es6';
import dom from '../../utils/dom.es6';

const Modal = React.createClass({
    getInitialState () {
        return {command: getState().modals[this.props.type]};
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
        setModalCommand(this.props.type, null);
    },

    render () {
        const payload = _getModal(this.props.type, this.props.data);
        return (
            <div className="modal-wrapper">
                <div className={'modal-window' + (this.state.command === 'wait' ? ' wait' : '')}>
                    <div className="close" onClick={this._onCloseHandler}></div>
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
            command: state.modals[this.props.type]
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
function _open (type, data) {
    const shader = document.createElement('div');
    shader.className = 'modal-shader';
    document.body.appendChild(shader);

    ReactDom.render(<Modal type={type} data={data}/>, shader);
}

function _getModal (type, props) {
    if (type === 'edit-dish') {
        return <EditDish {...props} />;
    }
    if (type === 'delete-dish') {
        return <DeleteDish {...props} />;
    }

    return null;
}
