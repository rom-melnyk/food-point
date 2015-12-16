import React from 'react';
import Row from './dish-row.es6';
import { getDishes, openEditDishModal } from './dish-actions.es6';

export default React.createClass({
    componentDidMount () {
        getDishes();
    },

    render () {
        const rows = this.props.data.children.map((dish) => {
            return <Row key={dish.id} {...dish}/>
        });

        return (
            <div className="view dishes">
                <h1>Страви</h1>
                <ul>
                    {rows}
                </ul>
                <div className="create-dish">
                    <span className="button create" onClick={this._onCreateHandler}>
                        Додати стравy
                    </span>
                </div>
            </div>
        );
    },

    _onCreateHandler () {
        openEditDishModal();
    }
});
