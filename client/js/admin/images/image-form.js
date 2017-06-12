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
        this.onNewFileClick = this.onNewFileClick.bind(this);
    }

    render(props, { file }) {
        return (
            <div className="form" >
                <div className="row">
                    <div className="label column-3">Додати зображення:</div>
                    <div className="column-9">
                        <input type="file" name="image" onChange={ this.onNewFileClick } />
                    </div>
                </div>
                <div className="controls">
                    <Button type={ Types.BACK } />
                    { file ? <Button type={ Types.OK } onClick={ this.onSaveClick } /> : null }
                </div>
            </div>
        );
    }

    onSaveClick(e) {
        uploadImage(this.state.file)
            .then((res) => {
                if (res !== false) {
                    e.target.value = '';
                }
            })
            .catch(console.error);
    }

    onNewFileClick(e) {
        this.setState({ file: e.target.files && e.target.files[0] });
    }
}


export default ImageForm;
