import { h, Component } from 'preact';
import { Button, Types } from '../../form-elements/buttons';
import { uploadImage } from './image-actions';


/**
 * @stateful
 */
class ImageForm extends Component {
    constructor() {
        super(...arguments);
        this.onSaveClick = this.onSaveClick.bind(this);
    }

    render(props, state) {
        return (
            <div className="form" >
                <div className="row">
                    <div className="label column-3">Додати зображення:</div>
                    <div className="column-9">
                        <input type="file" name="image" ref={ (i) => { this.input = i; } }/>
                    </div>
                </div>
                <div className="controls">
                    <Button type={ Types.BACK } />
                    { this.hasFile() ? <Button type={ Types.OK } onClick={ this.onSaveClick } /> : null }
                </div>
            </div>
        );
    }

    onSaveClick(e) {
        uploadImage(this.input.files[0])
            .then((res) => {
                if (res !== false) {
                    this.input.value = '';
                }
            })
            .catch(console.error);
    }

    hasFile() {
        return this.input && this.input.files && this.input.files.length;
    }

}


export default ImageForm;
