import React from 'react';
//import DishesList from '../shared/dishes-all-rows.es6';

export default React.createClass({
    render () {
        return (
            <div className="view order">
                <div className="wrapper">
                    <h1>Щоби замовити їжу,</h1>
                    <section>
                        &hellip;зателефонуйте нам:
                        <ul>
                            <li>+38 (050) 599-37-33</li>
                            <li>+38 (096) 468-65-87</li>
                        </ul>
                    </section>
                    <section>
                        Вже скоро ми зробимо можливість замовляти їжу через форму тут, а поки що&nbsp;&mdash; телефонуйте.
                    </section>
                </div>
            </div>
        );
    },

    /*
     <div className="order-total">
     <div className="total">TOTAL: {this._getOrderTotal()}</div>
     </div>

     <DishesList data={this.props.data} user={this.props.user} order={true} />
    */

    _getOrderTotal () {
        return this.props.order.what.reduce((sum, item) => {
            sum += item.count * item.dish.price;
            return sum;
        }, 0);
    }
});
