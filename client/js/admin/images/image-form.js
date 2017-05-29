import { h, Component } from 'preact';
import { post } from '../../utils/request';
import state from '../state';


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
                    <div className="label column-1">Файл</div>
                    <div className="column-3">
                        <input type="file" name="image" ref={ (i) => { this.input = i; } }/>
                    </div>
                </div>
                <div class="controls">
                    <span class="button grey" onClick={ this.onBackClick }>Назад</span>
                    <span class="button green" onClick={ this.onSaveClick }>Завантажити</span>
                </div>
            </div>
        );
    }

    onBackClick(e) {
        history.back();
    }

    onSaveClick(e) {
        if (this.input && this.input.files && this.input.files.length) {
            post('/api/images', this.input.files[0]);
        }
    }

}


export default ImageForm;
