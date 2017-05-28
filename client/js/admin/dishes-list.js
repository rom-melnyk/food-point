import { h, Component } from 'preact';
import Dish from './dish';


class DishList extends Component {
    render({ dishes }, state) {
        const dishesComps = dishes.map(d => <Dish { ...d } />);
        return (
            <div class="dishes">
                <h1>Dishes:</h1>
                { dishesComps }
            </div>
        );
    }
}


export default DishList;
