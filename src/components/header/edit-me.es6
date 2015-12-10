import React from 'react';
import ReactDom from 'react-dom';
import { editMe, setModalCommand } from '../../actions.es6';
import ModalControls from '../modals/controls.es6';

export default React.createClass({
    componentDidMount () {
        const container = ReactDom.findDOMNode(this);

        this._name = container.querySelector('[name=name]');
        this._email = container.querySelector('[name=email]');
        this._address = container.querySelector('[name=address]');
        this._phone = container.querySelector('[name=phone]');

        this._name.value = this.props.data.name || '';
        this._email.value = this.props.data.email || '';
        this._address.value = this.props.data.address || '';
        this._phone.value = this.props.data.phone || '';
    },

    componentWillUnmount () {
        this._name = null;
        this._email = null;
        this._address = null;
        this._phone = null;
    },

    render () {
        return (
            <div className="edit-me">
                <div className="input-section">
                    <label>Ім’я</label>
                    <span className="input-wrapper">
                      <input type="text" name="name"/>
                    </span>
                </div>
                <div className="input-section">
                    <label>Е-пошта</label>
                    <span className="input-wrapper">
                      <input type="text" name="email"/>
                    </span>
                </div>
                <div className="input-section">
                    <label>Адреса</label>
                    <span className="input-wrapper">
                      <input type="text" name="address"/>
                    </span>
                </div>
                <div className="input-section">
                    <label>Телефон</label>
                    <span className="input-wrapper">
                      <input type="text" name="phone"/>
                    </span>
                </div>
                <ModalControls onBackHandler={this._onBackHandler} onOkHandler={this._onOkHandler}/>
            </div>
        );
    },

    _name: null,
    _email: null,
    _address: null,
    _phone: null,

    _onOkHandler () {
        editMe(this.props.data.id, this._name.value, this._email.value, this._address.value, this._phone.value);
    },

    _onBackHandler () {
        setModalCommand('edit-me', 'close');
    }
});
