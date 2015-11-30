import React from 'react';
import Modals from '../modals/modals.es6';
import { moveDishUp } from '../../actions.es6';

export default React.createClass({
    render () {
        return (
            <li>
                <div className="left">
                    <span className="ordinal">{this.props.attr.ordinal + 1}</span>
                    <span className="name">{this.props.name}</span>
                </div>
                <div className="right">
                    <span className="price"> {this.props.price}</span>
                    <span className="controls">
                        <span className="button edit" onClick={this._onEditHandler}></span>
                        <span className="button delete" onClick={this._onDeleteHandler}></span>
                        <span className="up-down">
                            <span className="up" onClick={this._onUpHandler}></span>
                            <span className="down" onClick={this._onDownHandler}></span>
                        </span>
                    </span>
                </div>
            </li>
        );
    },

    _onEditHandler () {
        Modals.open('edit-dish', {
            id: this.props.id,
            name: this.props.name,
            price: this.props.price,
            attr: this.props.attr
        });
    },

    _onDeleteHandler () {
        Modals.open('delete-dish', {
            id: this.props.id,
            name: this.props.name
        });
    },

    _onUpHandler () {
        moveDishUp(this.props.attr.ordinal);
    },

    _onDownHandler () {
        moveDishUp(this.props.attr.ordinal + 1);
    }
});
