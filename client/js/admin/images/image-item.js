import { h, Component } from 'preact';

const PATH = '/gfx/uploaded/';

class Image extends Component {
    render({ name, selectable = false }, { selected }) {
        return (
            <div className="column-1 image">
                <img src={ PATH + name } alt={ name }/>
            </div>
        );
    }
}


export default Image;
