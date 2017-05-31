import { h, Component } from 'preact';
import { uploadImage } from './image-actions';


/**
 * @stateful
 */
class ImageForm extends Component {
    constructor() {
        super(...arguments);
        this.onBackClick = this.onBackClick.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
    }

    render(props, state) {
        return (
            <div className="form" >
                <div className="row">
                    <div className="label column-1">Додати зображення:</div>
                    <div className="column-3">
                        <input type="file" name="image" ref={ (i) => { this.input = i; } }/>
                    </div>
                </div>
                <div className="controls">
                    <span className="button grey" onClick={ this.onBackClick }>Назад</span>
                    <span className="button green" onClick={ this.onSaveClick }>Завантажити</span>
                </div>
            </div>
        );
    }

    onBackClick(e) {
        history.back();
    }

    onSaveClick(e) {
        if (this.input && this.input.files && this.input.files.length) {
            uploadImage(this.input.files[0])
                .then((res) => {
                    if (res !== false) {
                        this.input.value = '';
                    }
                })
                .catch(console.error);
        }
    }

}


export default ImageForm;
