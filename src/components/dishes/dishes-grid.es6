import React from 'react';
import Row from './dish-row.es6';
import { getDishes } from '../../actions.es6';
import Modal from '../modals/modals.es6';

export default React.createClass({
    componentDidMount () {
        getDishes();
    },

    render () {
        const rows = this.props.dishes.map((dish) => {
            return <Row key={dish.id} name={dish.name} price={dish.price} id={dish.id}/>
        });

        return (
            <div className="page dishes">
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
        Modal.open('edit-dish');
    }
});
