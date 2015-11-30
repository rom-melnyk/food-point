import React from 'react';
import ReactDom from 'react-dom';
import { deleteDish, setModalCommand } from '../../actions.es6';

export default React.createClass({
    render () {
        return (
            <div className="delete-dish">
                <div className="label">
                    Видалити <span className="name">{this.props.name}</span>?
                </div>
                <div className="controls">
                    <span className="button cancel" onClick={this._onBackHandler}></span>
                    <span className="button submit" onClick={this._onOkHandler}></span>
                </div>
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
