import React from 'react';
import ReactDom from 'react-dom';
import { updateDishInTheOrder } from '../order/order-actions.es6';
import dom from '../../utils/dom.es6'

export default React.createClass({
    componentDidMount () {
        const thisEl = dom(ReactDom.findDOMNode(this))[0];
        this._checkbox = dom('[type=checkbox]', thisEl)[0];
        this._number = dom('[type=number]', thisEl)[0];
        // TODO apply values depending on `state.order`
    },

    componentWillUnmount () {
        this._checkbox = null;
        this._number = null;
    },

    render () {
        const orderControlsArea = (
            <span className="order">
                <input type="checkbox" onChange={this._onUpdateHandler}/>
                <input type="number" onChange={this._onUpdateHandler}/>
                <span className="label">&#10005;</span>
            </span>
        );

        return orderControlsArea;
    },

    _onUpdateHandler () {
        if (!this._number.value) {
            this._number.value = 1;
        }

        updateDishInTheOrder(this.props , this._checkbox.checked, +this._number.value || 1);
    },

    _checkbox: null,
    _number: null
});
