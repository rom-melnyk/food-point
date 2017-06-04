import { h, Component } from 'preact';

import { Textarea, TextInput, ImageInput } from '../../form-elements/form-elements';
import { route } from 'preact-router';
import { updateGroup, createGroup } from './group-actions';
import { selectImage } from '../images/image-actions';

import store from '../store';
import { LINKS } from '../urls';


const FIELDS = [
    { name: 'name', label: 'Назва' },
    { name: 'description', label: 'Опис' },
    { name: 'image', label: 'Зображення' }
];
let editState = null;

/**
 * @stateful
 */
class GroupForm extends Component {
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
        const header = state.id ? 'Редагувати групу' : 'Створити групу';
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
            case 'image': return <ImageInput name={ name } label={ label } image={ value } parent={ this } onPick={ this.onImagePickerClick } />;
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
            updateGroup(this.state.id, data);
        } else {
            createGroup(data);
        }
    }

    onImagePickerClick() {
        editState = this.state;
        route(LINKS.ImagePicker);
    }
}


export default GroupForm;
