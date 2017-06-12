import { h, Component } from 'preact';
import DishGroup from './dish-group';
import { Button, Types } from '../../form-elements/buttons';
import { route } from 'preact-router';
import { LINKS } from '../urls';

class DishesManager extends Component {
    render({ dishesStructure }, state) {
        const linkComp = (
            <div className="controls">
                <Button
                    type={ Types.ADD }
                    onClick={ this.onAddDishClick }
                    title="Додати страву"
                    showTitle={ true }
                    iconClassName='file-o'
                />
                <Button
                    type={ Types.ADD }
                    onClick={ this.onAddGroupClick }
                    title="Додати групу"
                    showTitle={ true }
                    iconClassName='file-text-o'
                />
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
