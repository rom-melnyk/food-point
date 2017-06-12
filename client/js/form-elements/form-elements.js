import { h, Component } from 'preact';
import { Button, Types } from './buttons';
import { PATH as IMAGE_PATH } from '../admin/images/image-constants';


function generateOnInputHandler(name, parent, onInput) {
    return typeof onInput === 'function'
        ? onInput
        : (e) => {
            let value = e.target.value;
            if (value) {
                value = +e.target.value;
                if (isNaN(value)) {
                    value = e.target.value;
                }
            }
            parent.setState({ [name]: value });
        }
}

class Textarea extends Component {
    constructor({ name, parent, onInput }) {
        super(...arguments);
        this.onInput = generateOnInputHandler(name, parent, onInput);
    }

    render({ name, label, rows = 3, value = '' }, state) {
        label = label || name;
        return (
            <div className="row">
                <div className="label column-3">{ label }</div>
                <div className="column-9">
                    <textarea rows={ rows } name={ name } value={ value } onInput={ this.onInput } />
                </div>
            </div>
        );
    }
}


class TextInput extends Component {
    constructor({ name, parent, onInput }) {
        super(...arguments);
        this.onInput = generateOnInputHandler(name, parent, onInput);
    }

    render({ name, label, value = '' }, state) {
        label = label || name;
        return (
            <div className="row">
                <div className="label column-3">{ label }</div>
                <div className="column-9">
                    <input type="text" name={ name } value={ value } onInput={ this.onInput }/>
                </div>
            </div>
        );
    }
}


class NumberInput extends Component {
    constructor({ name, parent, onInput }) {
        super(...arguments);
        this.onInput = generateOnInputHandler(name, parent, onInput);
    }

    render({ name, label, value = '', min = -1, max = 999 }, state) {
        label = label || name;
        return (
            <div className="row">
                <div className="label column-3">{ label }</div>
                <div className="column-3">
                    <input type="number" name={ name } value={ value } min={ min } max={ max } onInput={ this.onInput }/>
                </div>
            </div>
        );
    }
}


class ImageInput extends Component {
    constructor({ name, parent, onPick, onDelete }) {
        super(...arguments);
        this.onPick = typeof onPick === 'function' ? onPick : () => {};
        this.onDelete = typeof onDelete === 'function'
            ? onDelete
            : () => {
                if (window.confirm('Таки без зображення?')) {
                    parent.setState({ [name]: null });
                }
            }
    }

    render({ image = '', label }, state) {
        label = label || name;
        const imageComp = image
            ? <span className="image" style={ `background-image: url(${ IMAGE_PATH + image });` } title={ image } />
            : <span className="image none" />;
        const delButtonComp = image
            ? <Button type={ Types.DELETE } narrow={ true } onClick={ this.onDelete } />
            : null;

        return (
            <div className="row">
                <div className="label column-3">{ label }</div>
                <div className="column-3">
                    <div className="image-wrapper has-hover-controls">
                        { imageComp }
                        <div className="hover-controls small">
                            <Button type={ Types.PICK } narrow={ true } onClick={ this.onPick } />
                            { delButtonComp }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


class GroupInput extends Component {
    constructor({ name, parent, onInput }) {
        super(...arguments);
        this.onInput = generateOnInputHandler(name, parent, onInput);
    }

    render({ name, label, value = '', groups = [] }, state) {
        label = label || name;
        // value = value || (this.groups[0] && this.groups[0].id);
        const optionsComps = groups.map(o => <option value={o.id }>{ o.name === '/' ? '[ Меню ]' : o.name }</option>);
        return (
            <div className="row">
                <div className="label column-3">{ label }</div>
                <div className="column-9">
                    <select name={ name } value={ value } onInput={ this.onInput }>
                        { optionsComps }
                    </select>
                </div>
            </div>
        );
    }
}


export {
    Textarea,
    TextInput,
    NumberInput,
    GroupInput,
    ImageInput
};
