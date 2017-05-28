import { h, Component } from 'preact';
import Dish from './dish';
import DishForm from './dish-form';


class DishList extends Component {
    render({ dishes }, state) {
        const dishesComps = dishes.map(d => <Dish { ...d } />);
        dishesComps.push(<DishForm />);
        return (
            <div class="dishes">
                <h1>Dishes:</h1>
                { dishesComps }
            </div>
        );
    }
}


export default DishList;
