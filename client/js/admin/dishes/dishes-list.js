import { h, Component } from 'preact';
import Dish from './dish-item';
import { route } from 'preact-router';
import { LINKS } from '../urls';

class DishList extends Component {
    render({ dishes }, state) {
        const dishesComps = dishes.map(d => <Dish { ...d } />);
        const linkComp = (
            <div className="controls">
                <span className="button green" onClick={ this.onAddClick }>
                    Додати страву
                </span>
            </div>
        );
        return (
            <div className="dishes">
                <h1>Страви:</h1>
                { dishesComps }
                { linkComp }
            </div>
        );
    }

    onAddClick(e) {
        route(LINKS.EditDish);
    }
}


export default DishList;
