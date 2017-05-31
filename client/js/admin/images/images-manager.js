import { h, Component } from 'preact';
import Image from './image-item';
import ImageForm from './image-form';
import { MODES } from './image-constants';
// import { route } from 'preact-router';
// import { LINKS } from '../urls';

class ImagesManager extends Component {
    render({ images, mode = MODES.Manager }, state) {
        const isPicker = mode === MODES.Picker;
        const header = isPicker ? 'Вибери зображення:' : 'Зображення:';
        const className = 'images' + (isPicker ? ' picker' : '' );
        const imagesComps = images.map(i => <Image name={ i } mode={ mode } />);
        return (
            <div className={ className }>
                <h1>{ header }</h1>
                <div className="row">
                    { imagesComps }
                </div>
                <ImageForm/>
            </div>
        );
    }
}


export default ImagesManager;
