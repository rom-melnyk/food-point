import { h, Component } from 'preact';
import DishGroup from './dish-group';
import { route } from 'preact-router';
import { LINKS } from '../urls';

class DishesManager extends Component {
    render({ dishesStructure }, state) {
        const linkComp = (
            <div className="controls">
                <span className="button green" onClick={ this.onAddDishClick }>
                    Додати страву
                </span>
                <span className="button green" onClick={ this.onAddGroupClick }>
                    Додати групу
                </span>
            </div>
        );
        return (
            <div className="dishes">
                <h1>Страви:</h1>
                <DishGroup { ...dishesStructure } />
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
