import { h, Component } from 'preact';
import Image from './image-item';
// import { route } from 'preact-router';
// import { LINKS } from '../urls';

class ImagesList extends Component {
    render({ images }, state) {
        const imagesComps = images.map(i => <Image { ...i } />);
        // const linkComp = (
        //     <div className="controls">
        //         <span className="button green" onClick={ this.onAddClick }>
        //             Додати страву
        //         </span>
        //     </div>
        // );
        return (
            <div className="images">
                <h1>Зображення:</h1>
                { imagesComps }
                { /*linkComp*/ }
            </div>
        );
    }

    onAddClick(e) {
        route(LINKS.EditDish);
    }
}


export default ImagesList;
