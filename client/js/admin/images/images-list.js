import { h, Component } from 'preact';
import Image from './image-item';
// import { route } from 'preact-router';
// import { LINKS } from '../urls';

class ImagesList extends Component {
    render({ images, selectable = false }, state) {
        const imagesComps = images.map(i => <Image name={ i } />);
        const className = 'images row' + ( selectable ? ' selectable' : '' );
        return (
            <div className={ className }>
                <h1>Зображення:</h1>
                { imagesComps }
            </div>
        );
    }

    onAddClick(e) {
        route(LINKS.EditDish);
    }
}


export default ImagesList;
