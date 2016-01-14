import React from 'react';
import { openEditDishModal, openDeleteDishModal, moveDishUp } from './dish-actions.es6';

export default React.createClass({
    render () {
        const editControlsArea = (
            <span className="edit-controls">
                <span className="link edit" onClick={this._onEditHandler}></span>
                <span className="link delete" onClick={this._onDeleteHandler}></span>
                <span className="up-down">
                    <span className="up" onClick={this._onUpHandler}></span>
                    <span className="down" onClick={this._onDownHandler}></span>
                </span>
            </span>
        );

        return editControlsArea;
    },

    _onEditHandler () {
        openEditDishModal(this.props);
    },

    _onDeleteHandler () {
        openDeleteDishModal(this.props);
    },

    _onUpHandler () {
        moveDishUp(this.props.parent, this.props.ordinal);
    },

    _onDownHandler () {
        moveDishUp(this.props.parent, this.props.ordinal + 1);
    }
});
