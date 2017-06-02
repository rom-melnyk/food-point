import { h, Component } from 'preact';
import Dish from './dish-item';
import { route } from 'preact-router';
import { LINKS } from '../urls';

class DishesManager extends Component {
    render({ dishes }, state) {
        const dishesComps = dishes.map(d => <Dish { ...d } />);
        const linkComp = (
            <div className="controls">
                <span className="button green" onClick={ this.onAddDishClick }>
                    Додати страву
                </span>
                <span className="button green" onClick={ this.onAddGroupClick }>
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

    onAddDishClick(e) {
        route(LINKS.EditDish);
    }

    onAddGroupClick(e) {
        route(LINKS.EditGroup);
    }
}


export default DishesManager;
