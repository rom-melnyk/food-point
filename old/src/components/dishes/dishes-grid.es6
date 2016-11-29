import React from 'react';
import AllRows from './../shared/dishes-all-rows.es6';
import { getDishes, openEditDishModal } from './dish-actions.es6';

export default React.createClass({
    componentDidMount () {
        getDishes();
    },

    render () {
        const createEl = this.props.role === 'admin' && !this.props.order
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
                    <AllRows {...this.props} />
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
