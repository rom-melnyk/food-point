import React from 'react';
import ReactDom from 'react-dom';
import { deleteDish, setModalCommand } from '../../actions.es6';
import ModalControls from '../modals/form-controls.es6';

export default React.createClass({
    render () {
        return (
            <div className="delete-dish">
                <div className="label">
                    Видалити <span className="name">{this.props.name}</span>?
                </div>
                <ModalControls onBackHandler={this._onBackHandler} onOkHandler={this._onOkHandler}/>
            </div>
        );
    },

    _onOkHandler () {
        deleteDish(this.props.id);
    },

    _onBackHandler () {
        setModalCommand('delete-dish', 'close');
    }
});
