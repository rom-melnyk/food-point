import React from 'react';
import ReactDom from 'react-dom';
import { editDish, setModalCommand } from '../../actions.es6';
import ModalControls from '../modals/form-controls.es6';

export default React.createClass({
    componentDidMount () {
        const container = ReactDom.findDOMNode(this);

        this._name = container.querySelector('[name=name]');
        this._price = container.querySelector('[name=price]');

        this._name.value = this.props.name || '';
        this._price.value = this.props.price || 0;
    },

    componentWillUnmount () {
        this._name = null;
        this._price = null;
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
                <ModalControls onBackHandler={this._onBackHandler} onOkHandler={this._onOkHandler}/>
            </div>
        );
    },

    _name: null,
    _price: null,

    _onOkHandler () {
        editDish(this.props.id, this._name.value, this._price.value);
    },

    _onBackHandler () {
        setModalCommand('edit-dish', 'close');
    }
});
