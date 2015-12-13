import React from 'react';
import { editMyData, setModalCommand } from '../../actions.es6';
import ModalControls from '../modals/form-controls.es6';
import ModalSection from '../modals/form-section.es6';

export default React.createClass({
    componentDidMount () {
        this._name.setValue(this.props.data.name || '');
        this._email.setValue(this.props.data.email || '');
        this._address.setValue(this.props.data.address || '');
        this._phone.setValue(this.props.data.phone || '');
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
                <ModalSection label="Ім’я" name="name" ref={(cmp) => {this._name = cmp;}} />
                <ModalSection label="Е-пошта" name="email" ref={(cmp) => {this._email = cmp;}} />
                <ModalSection label="Адреса" name="address" ref={(cmp) => {this._address = cmp;}} />
                <ModalSection label="Телефон" name="phone" ref={(cmp) => {this._phone = cmp;}} />
                <ModalControls onBackHandler={this._onBackHandler} onOkHandler={this._onOkHandler}/>
            </div>
        );
    },

    _name: null,
    _email: null,
    _address: null,
    _phone: null,

    _onOkHandler () {
        editMyData(this.props.data.id, {
            name: this._name.getValue(),
            email: this._email.getValue(),
            address: this._address.getValue(),
            phone: this._phone.getValue()
        });
    },

    _onBackHandler () {
        setModalCommand('edit-me', 'close');
    }
});
