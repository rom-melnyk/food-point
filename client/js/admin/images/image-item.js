import { h, Component } from 'preact';

const PATH = '/gfx/uploaded/';

class Image extends Component {
    render({ name, selectable = false }, { selected }) {
        return (
            <div className="column-1 image-wrapper">
                <span className="image" style={ `background-image: url(${ PATH + name });` } title={ name }/>
            </div>
        );
    }
}


export default Image;
