import React from 'react';
import Modals from '../modals/modals.es6';

export default React.createClass({
    componentDiMount () {},

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
                            className="button edit icon-edit"
                            data-id="{this.props.id}"
                            onClick={this._onEditHandler}
                        ></span>
                        <span
                            className="button delete icon-x"
                            data-id="{this.props.id}"
                            onClick={this._onEditHandler}
                        ></span>
                    </span>
                </div>
            </li>
        );
    },

    _onEditHandler () {
        Modals.open();
    }
});
