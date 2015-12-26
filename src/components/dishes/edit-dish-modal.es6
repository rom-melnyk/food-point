import _ from '../../utils/_.es6';
import React from 'react';
import { openEditDishModal, createDish, updateDish } from './dish-actions.es6';
import { setModalCommand } from '../../actions.es6';
import { getAllSections, getItemById } from '../../selectors/dishes-selectors.es6';
import ModalControls from '../modals/form-controls.es6';
import ModalSection from '../modals/form-section.es6';

export default React.createClass({
    componentDidMount () {
        this._name.setValue(this.props.name || '');
        this._price.setValue(this.props.price || 0);
        this._description.setValue(this.props.description || '');
        this._image.setValue(this.props.image || '');
        if (this.props.parent) {
            this._parent.setValue(this.props.parent.id);
        }
    },

    componentWillUnmount () {
        this._name = null;
        this._price = null;
        this._description = null;
        this._image = null;
        this._parent= null;
    },

    render () {
        const priceTrail = <span className="currency">грн.</span>;
        const parentInput = (
            <select className="section" name="section">{this._generateSectionList()}</select>
        );

        if (this.props.shouldCreateSection) {
            console.log('Section expected!');
        }

        return (
            <div className="edit-dish">
                <ModalSection label="Страва" name="name" ref={(cmp) => { this._name = cmp; }} />
                <ModalSection label="Ціна" name="price" content={{afterInput: priceTrail}} ref={(cmp) => { this._price = cmp; }} />
                <ModalSection label="Опис" name="description" ref={(cmp) => { this._description = cmp; }} />
                <ModalSection label="Фото" name="image" ref={(cmp) => { this._image = cmp; }} />
                <ModalSection label="Помістити у" name="section" content={{input: parentInput}} ref={(cmp) => { this._parent= cmp; }} />
                <ModalControls onBackHandler={this._onBackHandler} onOkHandler={this._onOkHandler}/>
            </div>
        );
    },

    _name: null,
    _price: null,
    _description: null,
    _image: null,
    _parent: null,

    _generateSectionList () {
        const options = [];

        getAllSections().forEach((section) => {
            let name = section.name;

            if (name === '/') {
                name = 'Головне меню'
            }

            options.push(
                <option key={section.id} value={section.id}>{name}</option>
            );
        });

        return options;
    },

    _onOkHandler () {
        const newDishData = {};

        ['name', 'price', 'description', 'image'].forEach((field) => {
            newDishData[field] = this[`_${field}`].getValue();
        }, this);
        newDishData.parent = getItemById( +this._parent.getValue() );

        if (this.props.id === undefined) { // crete new dish
            createDish(newDishData);
        } else {
            newDishData.id = this.props.id;
            updateDish(newDishData, this.props.parent);
        }
    },

    _onBackHandler () {
        setModalCommand('edit-dish', 'close');
    }
});
