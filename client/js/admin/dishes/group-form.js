import { h, Component } from 'preact';

import { Textarea, TextInput, NumberInput, ImageInput } from '../../form-elements/form-elements';
import { route } from 'preact-router';
import { updateDish, createDish } from './dish-actions';
import { selectImage } from '../images/image-actions';

import store from '../store';
import { LINKS } from '../urls';


const FIELDS = [ 'name', 'description', 'size', 'price', 'image' ];
let editState = null;

/**
 * @stateful
 */
class DishForm extends Component {
    constructor() {
        super(...arguments);
        this.onBackClick = this.onBackClick.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onImagePickerClick = this.onImagePickerClick.bind(this);
    }

    componentDidMount() {
        const id = +this.props.id;
        if (id) {
            this.setState( store.state.dishes.find(d => d.id === id) || {} );
        }
        if (editState) {
            this.setState(editState);
            editState = null;
        }
        this.setState
        if (store.state['image-picker']) {
            this.setState({ image: store.state['image-picker'] });
            selectImage(null);
        }
    }

    render(props, state) {
        const header = state.id ? 'Редагувати страву' : 'Створити страву';
        const formComps = FIELDS.map(field => (
            <div className="row">
                <div className="label column-1">{ this.getFormLabelName(field) }</div>
                <div className="column-3">{ this.getFormInputElement(field, state[field]) }</div>
            </div>
        ));
        return (
            <div className="form">
                <h1>{ header }</h1>
                { formComps }
                <div className="controls">
                    <span className="button grey back" onClick={ this.onBackClick }>Назад</span>
                    <span className="button green save" onClick={ this.onSaveClick }>Зберегти</span>
                </div>
            </div>
        );
    }

    getFormLabelName(field) {
        return ({
            name: 'Назва',
            description: 'Опис',
            size: 'Порція',
            price: 'Ціна',
            image: 'Зображення'
        })[field] || field;
    }

    getFormInputElement(field, value) {
        switch (field) {
            case 'description': return <Textarea name="description" value={ value } parent={ this } />;
            case 'price': return <NumberInput name="price" value={ value } parent={ this } />;
            case 'image': return <ImageInput name="image" image={ value } parent={ this } onPick={ this.onImagePickerClick } />;
            default:
        }
        return <TextInput name={ field } value={ value } parent={ this } />;
    }

    onBackClick(e) {
        history.back();
    }

    onSaveClick(e) {
        const data = FIELDS.reduce((obj, field) => {
            obj[field] = this.state[field];
            return obj;
        }, {});

        if (this.state.id) {
            updateDish(this.state.id, data);
        } else {
            createDish(data);
        }
    }

    onImagePickerClick() {
        editState = this.state;
        route(LINKS.ImagePicker);
    }
}


export default DishForm;
