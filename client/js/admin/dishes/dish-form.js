import { h, Component } from 'preact';

import { Textarea, TextInput, NumberInput, ImageInput, GroupInput } from '../../form-elements/form-elements';
import { route } from 'preact-router';
import { updateDish, createDish } from './dish-actions';
import { selectImage } from '../images/image-actions';

import store from '../store';
import { LINKS } from '../urls';


const FIELDS = [
    { name: 'name', label: 'Назва' },
    { name: 'description', label: 'Опис' },
    { name: 'size', label: 'Порція' },
    { name: 'price', label: 'Ціна' },
    { name: 'group', label: 'Група' },
    { name: 'image', label: 'Зображення' }
];
let editState = null;

/**
 * @stateful
 */
class DishForm extends Component {
    constructor(props) {
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
        if (store.state['image-picker']) {
            this.setState({ image: store.state['image-picker'] });
            selectImage(null);
        }
    }

    render(props, state) {
        const header = state.id ? 'Редагувати страву' : 'Створити страву';
        const formComps = FIELDS.map( ({ name, label }) => this.getFormInputElement(name, label, state[name]) );
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

    getFormInputElement(name, label, value) {
        switch (name) {
            case 'description': return <Textarea name={ name } label={ label } value={ value } parent={ this } />;
            case 'price': return <NumberInput name={ name } label={ label } value={ value } parent={ this } />;
            case 'image': return <ImageInput name={ name } label={ label } image={ value } parent={ this } onPick={ this.onImagePickerClick } />;
            case 'group': return <GroupInput name={ name } label={ label } value={ value } groups={ this.props.groups } parent={ this } />;
            default:
        }
        return <TextInput name={ name } label={ label } value={ value } parent={ this } />;
    }

    onBackClick(e) {
        history.back();
    }

    onSaveClick(e) {
        const data = FIELDS.reduce((obj, { name }) => {
            obj[name] = this.state[name];
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
