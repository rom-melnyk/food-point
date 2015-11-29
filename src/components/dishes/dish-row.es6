import React from 'react';
import Modals from '../modals/modals.es6';

export default React.createClass({
    componentDidMount () {},

    render () {
        return (
            <li>
                <div className="left">
                    <span className="name">{this.props.name}</span>
                </div>
                <div className="right">
                    <span className="price"> {this.props.price}</span>
                    <span className="controls">
                        <span
                            className="button edit"
                            data-id="{this.props.id}"
                            onClick={this._onEditHandler}
                        ></span>
                        <span
                            className="button delete"
                            data-id="{this.props.id}"
                            onClick={this._onDeleteHandler}
                        ></span>
                    </span>
                </div>
            </li>
        );
    },

    _onEditHandler () {
        Modals.open('edit-dish', {
            id: this.props.id,
            name: this.props.name,
            price: this.props.price
        });
    },

    _onDeleteHandler () {
        Modals.open('delete-dish');
    }
});
