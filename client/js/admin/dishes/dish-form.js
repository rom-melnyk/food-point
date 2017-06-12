import { h, Component } from 'preact';

import { Textarea, TextInput, NumberInput, ImageInput, GroupInput } from '../../form-elements/form-elements';
import { Button, Types } from '../../form-elements/buttons';

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
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onImagePickerClick = this.onImagePickerClick.bind(this);
    }

    componentDidMount() {
        const id = +this.props.id;
        if (id) {
            const dish = store.state.dishes.find(d => d.id === id) || {};
            const parent = store.state.groups.find(g => g.items.indexOf(id) !== -1) || {};
            this.setState( dish );
            this.setState({ group: parent.id });
        } else {
            const root = store.state.groups.find(g => g.name === '/');
            this.setState({ group: root.id });
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
                    <Button type={ Types.BACK } />
                    <Button type={ Types.OK } onClick={ this.onSaveClick } />
                </div>
            </div>
        );
    }

    getFormInputElement(name, label, value) {
        switch (name) {
            case 'description': return <Textarea name={ name } label={ label } value={ value } parent={ this } />;
            case 'price': return <NumberInput name={ name } label={ label } value={ value } parent={ this } />;
            case 'group': return <GroupInput name={ name } label={ label } value={ value } groups={ store.state.groups } parent={ this } />;
            case 'image': return <ImageInput name={ name } label={ label } image={ value } parent={ this } onPick={ this.onImagePickerClick } />;
            default:
        }
        return <TextInput name={ name } label={ label } value={ value } parent={ this } />;
    }

    onSaveClick(e) {
        const data = FIELDS.reduce((obj, { name }) => {
            if (name !== 'group') {
                obj[ name ] = this.state[ name ];
            }
            return obj;
        }, {});

        if (this.state.id) {
            updateDish(this.state.id, data, this.state.group);
        } else {
            createDish(data, this.state.group);
        }
    }

    onImagePickerClick() {
        editState = this.state;
        route(LINKS.ImagePicker);
    }
}


export default DishForm;
