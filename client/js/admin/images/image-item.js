import { h, Component } from 'preact';
import { Button, Types } from '../../form-elements/buttons';
import { MODES, PATH } from './image-constants';
import { deleteImage, selectImage } from './image-actions';

class Image extends Component {
    constructor() {
        super(...arguments);
        this.onDelClick = this.onDelClick.bind(this);
        this.onSelectClick = this.onSelectClick.bind(this);
    }

    render({ name, mode = MODES.Manager }, { selected }) {
        const isManager = mode === MODES.Manager;
        const className = ' image-wrapper hoverable' + (isManager ? ' has-hover-controls' : '');
        const controlsComp = isManager
            ? (
                <div className="hover-controls">
                    <Button type={ Types.DELETE } onClick={ this.onDelClick } />
                </div>
            )
            : null;

        return (
            <div className="column-3">
                <div className={ className } onClick={ this.onSelectClick }>
                    <span className="image" style={ `background-image: url(${ PATH + name });` } title={ name } />
                    { controlsComp }
                </div>
            </div>
        );
    }

    onDelClick(e) {
        if (window.confirm('Видалити це зображення?')) {
            deleteImage(this.props.name);
        }
    }

    onSelectClick(e) {
        if (this.props.mode === MODES.Picker) {
            selectImage(this.props.name);
            history.back();
        }
    }
}


export default Image;
