import React from 'react';
import ReactDom from 'react-dom';
import { editDish } from '../../actions.es6';

export default React.createClass({
    componentDidMount () {
        const container = ReactDom.findDOMNode(this);

        this._name = container.querySelector('[name=name]');
        this._price = container.querySelector('[name=price]');

        this._name.value = this.props.name;
        this._price.value = this.props.price;
        // this.props.id
    },

    render () {
        return (
            <div className="edit-dish">
                <div className="input-section">
                    <label>Страва</label>
                    <span className="input-wrapper">
                      <input type="text" name="name"/>
                    </span>
                </div>
                <div className="input-section">
                    <label>Ціна</label>
                    <span className="input-wrapper">
                      <input type="text" name="price"/>
                      <span className="currency">грн.</span>
                    </span>
                </div>
                <div className="controls">
                    <span className="button cancel" onClick={this._onBackHandler}></span>
                    <span className="button submit" onClick={this._onOkHandler}></span>
                </div>
            </div>

        );
    },

    _onOkHandler () {
        editDish(this.props.id, this._name.value, this._price.value);
    },

    _onBackHandler () {
        //Modals.open();
    }
});
