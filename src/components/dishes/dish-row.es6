import React from 'react';
import { openEditDishModal, openDeleteDishModal, moveDishUp } from './dish-actions.es6';

const Row = React.createClass({
    render () {
        const toggleArea = this.props.children ? <span className="toggle"></span> : null;

        const description = this.props.description ? <span className="description">({this.props.description})</span> : null;

        const image = this.props.image ? <span className="image">{this.props.image}</span> : null;

        const ordinal = <span className="ordinal">{this.props.ordinal + 1}</span>;
        const name = <span className="name">{this.props.name}</span>;

        const price = this.props.children ? null : <span className="price">{this.props.price}</span>;

        const controlsArea = (
            <span className="controls">
                <span className="button edit" onClick={this._onEditHandler}></span>
                <span className="button delete" onClick={this._onDeleteHandler}></span>
                <span className="up-down">
                    <span className="up" onClick={this._onUpHandler}></span>
                    <span className="down" onClick={this._onDownHandler}></span>
                </span>
            </span>
        );

        const headerLeft = <div className="left">{toggleArea}{ordinal}{name}{description}{image}</div>;
        const headerRight = <div className="right">{price}{controlsArea}</div>;

        return this.props.children
            ? (
                <li className={this.props.children ? 'section' : ''}>
                    <div className="header">
                        {headerLeft}
                        {headerRight}
                    </div>
                    <div className="children">{this._getChildren(this.props.children)}</div>
                </li>
            ) : (
                <li>
                    {headerLeft}
                    {headerRight}
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

export default Row;
