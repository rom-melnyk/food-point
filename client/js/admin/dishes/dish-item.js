import { h, Component } from 'preact';
import DishForm from './dish-form';
import { deleteDish } from './dish-actions';
import { route } from 'preact-router';
import { LINKS } from '../urls';
import { PATH } from '../images/image-constants';


class Dish extends Component {
    constructor() {
        super(...arguments);
        this.onEditClick = this.onEditClick.bind(this);
        this.onDelClick = this.onDelClick.bind(this);
    }

    render({ id, name, description, image, size, price, props }, state) {
        const imageComp = image
            ? <span className="image" style={ `background-image: url(${ PATH + image });` } title={ image } />
            : <span className="image none" />;

        return (
            <div className="dish has-hover-controls">
                <div className="row">
                    <div className="column-1 image-wrapper">
                        { imageComp }
                    </div>
                    <div className="column-2 all-text">
                        <span className="name">{ name }</span>
                        { size ? ', ' : '' }
                        <span className="size">{ size }</span>
                        <div className="description">{ description }</div>
                    </div>
                    <div className="column-1">
                        <div className="price">{ price }</div>
                    </div>
                </div>
                <div className="hover-controls">
                    <span className="button blue edit" onClick={ this.onEditClick }>Edit</span>
                    <span className="button red delete" onClick={ this.onDelClick }>Delete</span>
                </div>
            </div>
        );
    }

    onEditClick(e) {
        route(`${LINKS.EditDish}/${this.props.id}`);
    }

    onDelClick(e) {
        deleteDish(this.props.id);
    }
}


export default Dish;
