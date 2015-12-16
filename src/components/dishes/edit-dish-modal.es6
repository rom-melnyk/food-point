import React from 'react';
import { openEditDishModal, updateDish } from './dish-actions.es6';
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
        if (this.props.parent) {
            this._section.setValue(this.props.parent.id);
        }
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
            <select className="section" name="section">{this._generateSectionList()}</select>
        );

        return (
            <div className="edit-dish">
                <ModalSection label="Страва" name="name" ref={(cmp) => { this._name = cmp; }} />
                <ModalSection label="Ціна" name="price" content={{afterInput: priceTrail}} ref={(cmp) => { this._price = cmp; }} />
                <ModalSection label="Опис" name="description" ref={(cmp) => { this._description = cmp; }} />
                <ModalSection label="Фото" name="image" ref={(cmp) => { this._image = cmp; }} />
                <ModalSection label="Помістити у" name="section" content={{input: sectionInput}} ref={(cmp) => { this._section = cmp; }} />
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
            let name = section.name;

            if (name === '/') {
                name = 'Головне меню'
            }

            options.push(
                <option key={section.id} value={section.id}>{name}</option>
            );
        });

        options.push(
            <option key={555} value="555">555</option>,
            <option key={666} value="666">666</option>
        );
        options.unshift(
            <option key={444} value="444">444</option>,
            <option key={333} value="333">333</option>
        );
        return options;
    },

    _onOkHandler () {
        updateDish(this.props.id, {
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
