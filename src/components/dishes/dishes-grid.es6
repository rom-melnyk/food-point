import React from 'react';
import Row from './dish-row.es6';
import { getDishes, openEditDishModal } from './dish-actions.es6';

export default React.createClass({
    componentDidMount () {
        getDishes();
    },

    render () {
        const rows = this.props.data.children.map((dish) => {
            return <Row key={dish.id} {...dish} role={this.props.user.role}/>
        });

        const createEl = this.props.role === 'admin'
            ? (
                <div className="create">
                    <span className="button create-dish" onClick={this._onCreateDishHandler}>
                        Додати стравy
                    </span>
                    <span className="button create-section" onClick={this._onCreateSectionHandler}>
                        Додати секцію
                    </span>
                </div>
            )
            : null;

        return (
            <div className="view dishes">
                <div className="wrapper">
                    <h1>Страви</h1>
                    <ul>
                        {rows}
                    </ul>
                    {createEl}
                </div>
            </div>
        );
    },

    _onCreateDishHandler () {
        openEditDishModal();
    },

    _onCreateSectionHandler () {
        openEditDishModal({children: []});
    }
});
