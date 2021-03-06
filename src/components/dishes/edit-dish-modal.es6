import _ from '../../utils/_.es6';
import React from 'react';
import { openEditDishModal, createDish, updateDish } from './dish-actions.es6';
import { setModalCommand } from '../../actions.es6';
import { getAllSections, getItemById, getRoot } from '../../selectors/dishes-selectors.es6';
import ModalControls from '../modals/form-controls.es6';
import ModalSection from '../modals/form-section.es6';

export default React.createClass({
    componentDidMount () {
        this._name.setValue(this.props.name || '');

        if (this._price) {
            this._price.setValue(this.props.price || 0);
        }

        if (this._description) {
            this._description.setValue(this.props.description || '');
        }

        //this._image.setValue(this.props.image || '');

        this._isVisible.setValue(!!this.props.isVisible);

        if (!this.props.children && this.props.parent) {
            this._parent.setValue(this.props.parent.id);
        }
    },

    componentWillUnmount () {
        this._name = null;
        this._price = null;
        this._description = null;
        //this._image = null;
        this._parent= null;
    },

    render () {
        const priceTrail = <span className="currency">грн.</span>;
        const sectionInput = (
            <select className="section" name="section">{ this._generateSectionList() }</select>
        );
        const isVisibleInput = (
            <input type="checkbox" className="is-visible" name="is-visible" />
        );

        let nameLabel;

        let priceElement = null;
        let descriptionElement = null;
        let imageElement = null; // <ModalSection label="Фото" name="image" ref={(cmp) => { this._image = cmp; }}/>;
        let sectionElement = null;

        if (this.props.children) {
            nameLabel = 'Секція';
        } else {
            nameLabel = 'Страва';
            priceElement = <ModalSection
                label="Ціна"
                name="price"
                content={{afterInput: priceTrail}}
                ref={(cmp) => { this._price = cmp; }}
            />;
            descriptionElement = <ModalSection label="Опис" name="description" ref={(cmp) => { this._description = cmp; }}/>;
            sectionElement = <ModalSection
                label="Помістити у"
                name="section"
                content={{input: sectionInput}}
                ref={(cmp) => { this._parent= cmp; }}
            />;
        }

        const nameElement = <ModalSection label={nameLabel} name="name" ref={(cmp) => { this._name = cmp; }} />;

        const isVisibleElement = <ModalSection
            label="Показувати?"
            name="is-visible"
            content={{input: isVisibleInput}}
            ref={(cmp) => { this._isVisible = cmp; }}
        />;

        return (
            <div className="edit-dish">
                {nameElement}
                {priceElement}
                {descriptionElement}
                {imageElement}
                {isVisibleElement}
                {sectionElement}
                <ModalControls onBackHandler={this._onBackHandler} onOkHandler={this._onOkHandler}/>
            </div>
        );
    },

    _name: null,
    _price: null,
    _description: null,
    //_image: null,
    _isVisible: null,
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

        ['name', 'price', 'description', 'image', 'isVisible'].forEach((field) => {
            newDishData[field] = this[`_${field}`] ? this[`_${field}`].getValue() : null;
        }, this);

        newDishData.children = this.props.children;

        if (newDishData.children) {
            newDishData.parent = getRoot(); // one-level tree
        } else {
            newDishData.parent = getItemById(+this._parent.getValue());
        }

        if (this.props.id === undefined) { // crete new dish or section
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
