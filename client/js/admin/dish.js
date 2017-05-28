import { h, Component } from 'preact';
import DishForm from './dish-form';
import { toggleDishEdit, deleteDish } from './actions';


class Dish extends Component {
    constructor() {
        super(...arguments);
        this.onEditClick = this.onEditClick.bind(this);
        this.onDelClick = this.onDelClick.bind(this);
    }

    render({ data, edit }, state) {
        const { id, name, description, image, size, price, props } = data;
        return edit
            ? <DishForm { ...data } />
            : (
                <div class="dish">
                    <div class="row">
                        <div class="column-3">
                            <div class="name">{ name }</div>
                            <div class="description">{ description }</div>
                            <div class="size">{ size }</div>
                        </div>
                        <div class="column-1">
                            <div class="description">{ price }</div>
                        </div>
                    </div>
                    <div class="controls-hover">
                        <span class="button edit info" onClick={ this.onEditClick }>Edit</span>
                        <span class="button delete error" onClick={ this.onDelClick }>Delete</span>
                    </div>
                </div>
            );
    }

    onEditClick(e) {
        toggleDishEdit(this.props.data.id, true);
    }

    onDelClick(e) {
        deleteDish(this.props.data.id);
    }
}


export default Dish;
