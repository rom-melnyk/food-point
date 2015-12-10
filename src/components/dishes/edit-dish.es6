import React from 'react';
import { editDish, setModalCommand } from '../../actions.es6';
import ModalControls from '../modals/form-controls.es6';
import ModalSection from '../modals/form-section.es6';

export default React.createClass({
    componentDidMount () {
        this._name.setValue(this.props.name || '');
        this._price.setValue(this.props.price || 0);
    },

    componentWillUnmount () {
        this._name = null;
        this._price = null;
    },

    render () {
        const afterInput = <span className="currency">грн.</span>;

        return (
            <div className="edit-dish">
                <ModalSection label="Страва" name="name" ref={(cmp) => { this._name = cmp; }} />
                <ModalSection label="Ціна" name="price" extraContent={{afterInput}} ref={(cmp) => { this._price = cmp; }} />
                <ModalControls onBackHandler={this._onBackHandler} onOkHandler={this._onOkHandler}/>
            </div>
        );
    },

    _name: null,
    _price: null,

    _onOkHandler () {
        editDish(this.props.id, this._name.getValue(), this._price.getValue());
    },

    _onBackHandler () {
        setModalCommand('edit-dish', 'close');
    }
});
