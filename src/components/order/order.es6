import React from 'react';
import DishesList from '../shared/dishes-all-rows.es6';

export default React.createClass({
    render () {
        return (
            <div className="view order">
                <div className="wrapper">
                    <div className="order-total">
                        <div className="total">TOTAL: {this._getOrderTotal()}</div>
                    </div>

                    <DishesList data={this.props.data} user={this.props.user} order={true} />
                </div>
            </div>
        );
    },

    _getOrderTotal () {
        return this.props.order.what.reduce((sum, item) => {
            sum += item.count * item.dish.price;
            return sum;
        }, 0);
    }
});
