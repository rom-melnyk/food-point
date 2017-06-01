import { h, Component } from 'preact';
import { PATH as IMAGE_PATH } from '../admin/images/image-constants';


function generateOnInputHandler(name, parent, onInput) {
    return typeof onInput === 'function'
        ? onInput
        : e => parent.setState({ [name]: e.target.value });
}

class Textarea extends Component {
    constructor({ name, parent, onInput }) {
        super(...arguments);
        this.onInput = generateOnInputHandler(name, parent, onInput);
    }

    render({ name, rows = 3, value = '' }, state) {
        return <textarea rows={ rows } name={ name } value={ value } onInput={ this.onInput } />;
    }
}


class TextInput extends Component {
    constructor({ name, parent, onInput }) {
        super(...arguments);
        this.onInput = generateOnInputHandler(name, parent, onInput);
    }

    render({ name, value = '' }, state) {
        return <input type="text" name={ name } value={ value } onInput={ this.onInput }/>;
    }
}


class NumberInput extends Component {
    constructor({ name, parent, onInput }) {
        super(...arguments);
        this.onInput = generateOnInputHandler(name, parent, onInput);
    }

    render({ name, value = '', min = -1, max = 999 }, state) {
        return <input type="number" name={ name } value={ value } min={ min } max={ max } onInput={ this.onInput }/>;
    }
}


class ImageInput extends Component {
    constructor({ name, parent, onPick, onDelete }) {
        super(...arguments);
        this.onPick = typeof onPick === 'function' ? onPick : () => {};
        this.onDelete = typeof onDelete === 'function' ? onDelete : () => parent.setState({ [name]: null });
    }

    render({ image = '' }, state) {
        const imageComp = image
            ? <span className="image" style={ `background-image: url(${ IMAGE_PATH + image });` } title={ image } />
            : <span className="image none" />;
        const delButtonComp = image
            ? <span className="button red delete" onClick={ this.onDelete }>X</span>
            : null;

        return (
            <div className="image-wrapper has-hover-controls">
                { imageComp }
                <div className="hover-controls">
                    <span className="button blue pick" onClick={ this.onPick }>...</span>
                    { delButtonComp }
                </div>
            </div>
        );
    }

}


export {
    Textarea,
    TextInput,
    NumberInput,
    ImageInput
};
