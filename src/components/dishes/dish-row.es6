import React from 'react';
import Modals from '../modals/modals.es6';
import { moveDishUp } from './dish-actions.es6';

const Row = React.createClass({
    render () {
        const description = this.props.description
            ? <span className="description">({this.props.description})</span>
            : null;

        const image = this.props.image
            ? <span className="image">{this.props.image}</span>
            : null;

        return (
            <li>
                <div className="left">
                    <span className="ordinal">{this.props.ordinal + 1}</span>
                    <span className="name">{this.props.name}</span>
                    {description}
                    {image}
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

                {this._getChildren(this.props.children)}
            </li>
        );
    },

    _getChildren (children) {
        if (children) {
            const rows = children.map((dish) => {
                return <Row key={dish.id} {...dish}/>;
            });

            return <ul>{rows}</ul>;
        }

        return null;
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
        moveDishUp(this.props.parent, this.props.ordinal);
    },

    _onDownHandler () {
        moveDishUp(this.props.parent, this.props.ordinal + 1);
    }
});

export default Row;
