import React from 'react';
import { editDish } from './dish-actions.es6';
import { setModalCommand } from '../../actions.es6';
import { getAllSections } from '../../selectors/dishes-selectors.es6';
import ModalControls from '../modals/form-controls.es6';
import ModalSection from '../modals/form-section.es6';

export default React.createClass({
    componentDidMount () {
        this._name.setValue(this.props.name || '');
        this._price.setValue(this.props.price || 0);
        this._description.setValue(this.props.description || '');
        this._image.setValue(this.props.image || '');
        this._section.setValue(this.props.image || '');
    },

    componentWillUnmount () {
        this._name = null;
        this._price = null;
        this._description = null;
        this._image = null;
        this._section = null;
    },

    render () {
        const priceTrail = <span className="currency">грн.</span>;
        const sectionInput = (
            <select className="section">{this._generateSectionList()}</select>
        );

        return (
            <div className="edit-dish">
                <ModalSection label="Страва" name="name" ref={(cmp) => { this._name = cmp; }} />
                <ModalSection label="Ціна" name="price" content={{afterInput: priceTrail}} ref={(cmp) => { this._price = cmp; }} />
                <ModalSection label="Опис" name="description" ref={(cmp) => { this._description = cmp; }} />
                <ModalSection label="Фото" name="image" ref={(cmp) => { this._image = cmp; }} />
                <ModalSection label="У категорії" name="section" content={{input: sectionInput}} ref={(cmp) => { this._section = cmp; }} />
                <ModalControls onBackHandler={this._onBackHandler} onOkHandler={this._onOkHandler}/>
            </div>
        );
    },

    _name: null,
    _price: null,
    _description: null,
    _image: null,
    _section: null,

    _generateSectionList () {
        const options = [];

        getAllSections().forEach((section) => {
            options.push(
                <option key={section.id} name={section.name} value={section.id}></option>
            );
        });

        return options;
    },

    _onOkHandler () {
        editDish(this.props.id, {
            name: this._name.getValue(),
            price: this._price.getValue(),
            description: this._description.getValue(),
            image: this._image.getValue()
        });
    },

    _onBackHandler () {
        setModalCommand('edit-dish', 'close');
    }
});
