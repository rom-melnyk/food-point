import { h, Component } from 'preact';
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
                    <span className="button red delete" onClick={ this.onDelClick }>X</span>
                </div>
            )
            : null;

        return (
            <div className="column-1">
                <div className={ className } onClick={ this.onSelectClick }>
                    <span className="image" style={ `background-image: url(${ PATH + name });` } title={ name } />
                    { controlsComp }
                </div>
            </div>
        );
    }

    onDelClick(e) {
        deleteImage(this.props.name);
    }

    onSelectClick(e) {
        if (this.props.mode === MODES.Picker) {
            selectImage(this.props.name);
            history.back();
        }
    }
}


export default Image;
