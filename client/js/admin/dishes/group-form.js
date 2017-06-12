import { h, Component } from 'preact';

import { Textarea, TextInput, GroupInput, ImageInput } from '../../form-elements/form-elements';
import { Button, Types } from '../../form-elements/buttons';

import { route } from 'preact-router';
import { updateGroup, createGroup } from './group-actions';
import { selectImage } from '../images/image-actions';

import store from '../store';
import { LINKS } from '../urls';


const FIELDS = [
    { name: 'name', label: 'Назва' },
    { name: 'description', label: 'Опис' },
    { name: 'group', label: 'Група' },
    { name: 'image', label: 'Зображення' }
];
let editState = null;

/**
 * @stateful
 */
class GroupForm extends Component {
    constructor() {
        super(...arguments);
        this.availableGroups = [];
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onImagePickerClick = this.onImagePickerClick.bind(this);
    }

    componentDidMount() {
        const id = +this.props.id;
        if (id) {
            const group = store.state.groups.find(d => d.id === id) || {};
            const gid = `g${id}`;
            const parent = store.state.groups.find(g => g.items.indexOf(gid) !== -1) || {};
            this.setState( group );
            this.setState({ group: parent.id });
            this.availableGroups = store.state.groups.filter(g => g.id !== id);
        } else {
            const root = store.state.groups.find(g => g.name === '/');
            this.setState({ group: root.id });
            this.availableGroups = store.state.groups;
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
        const header = state.id ? 'Редагувати групу' : 'Створити групу';
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
            case 'group': return <GroupInput name={ name } label={ label } value={ value } groups={ this.availableGroups } parent={ this } />;
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
            updateGroup(this.state.id, data, this.state.group);
        } else {
            createGroup(data, this.state.group);
        }
    }

    onImagePickerClick() {
        editState = this.state;
        route(LINKS.ImagePicker);
    }
}


export default GroupForm;
