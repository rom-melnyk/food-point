import React from 'react';
import ReactDom from 'react-dom';
import { moveDishUp } from './dish-actions.es6';
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
                <input type="checkbox" onChange={this._onCheckHandler}/>
                <input type="number" onChange={this._onNumberChangeHandler}/>
                <span className="label">x</span>
            </span>
        );

        return orderControlsArea;
    },

    _onCheckHandler () {
        if (this._checkbox.checked) {
            //...
        } else {
            //...
        }
    },

    _onNumberChangeHandler () {
        console.log('number changed: ' + this._number.value);
        console.log(this._number);
    },

    _checkbox: null,
    _number: null
});
