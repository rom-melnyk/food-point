import { h, Component } from 'preact';
import Dish from './dish-item';
import { deleteGroup } from './group-actions';
import { route } from 'preact-router';
import { LINKS } from '../urls';
import { PATH } from '../images/image-constants';


class DishGroup extends Component {
    constructor() {
        super(...arguments);
        this.onEditClick = this.onEditClick.bind(this);
        this.onDelClick = this.onDelClick.bind(this);
    }

    render({ id, name, description, image, items }, state) {
        const imageComp = image
            ? <span className="image" style={ `background-image: url(${ PATH + image });` } title={ image } />
            : <span className="image none" />;

        // don't show data and controls for root component
        const groupDataComps = name !== '/'
            ? (
                <div className="row group-data has-hover-controls">
                    <div className="column-1">
                        <div className="image-wrapper">{ imageComp }</div>
                    </div>
                    <div className="column-2 all-text">
                        <span className="name">{ name }</span>
                        <div className="description">{ description }</div>
                    </div>

                    <div className="hover-controls">
                        <span className="button blue edit" onClick={ this.onEditClick }>Edit</span>
                        <span className="button red delete" onClick={ this.onDelClick }>Delete</span>
                    </div>
                </div>
            )
            : null;

        const itemsComps = items && items.map(ch => ch.children
            ? <DishGroup { ...ch } />
            : <Dish { ...ch } />
        );
        return (
            <div className="group">
                { groupDataComps }
                <div className="group-items">
                    { itemsComps }
                </div>
            </div>
        );
    }

    onEditClick(e) {
        route(`${LINKS.EditGroup}/${this.props.id}`);
    }

    onDelClick(e) {
        deleteGroup(this.props.id);
    }
}


export default DishGroup;
