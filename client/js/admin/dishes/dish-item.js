import { h, Component } from 'preact';
import DishForm from './dish-form';
import { deleteDish } from './actions';
import { route } from 'preact-router';
import { LINKS } from '../urls';


class Dish extends Component {
    constructor() {
        super(...arguments);
        this.onEditClick = this.onEditClick.bind(this);
        this.onDelClick = this.onDelClick.bind(this);
    }

    render({ id, name, description, image, size, price, props }, state) {
        return (
            <div className="dish">
                <div className="row">
                    <div className="column-3">
                        <span className="name">{ name }</span>
                        { size ? ', ' : '' }
                        <span className="size">{ size }</span>
                        <div className="description">{ description }</div>
                    </div>
                    <div className="column-1">
                        <div className="price">{ price }</div>
                    </div>
                </div>
                <div className="controls-hover">
                    <span className="button blue info" onClick={ this.onEditClick }>Edit</span>
                    <span className="button red error" onClick={ this.onDelClick }>Delete</span>
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
