import React from 'react';
import Row from './dishes-row.es6';
import { getDishes } from '../../actions.es6';

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
            </div>
        );
    }
});
