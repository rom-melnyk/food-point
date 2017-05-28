import { h, Component } from 'preact';


class Dish extends Component {
    render({ name, description, size, price }, state) {
        return (
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
                <div class="controls">
                    <span class="button edit">Edit</span>
                    <span class="button delete">Delete</span>
                </div>
            </div>
        );
    }
}


export default Dish;
