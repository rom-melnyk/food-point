import React from 'react'; // must be defined for ReactDom
import ReactDom from 'react-dom';
import DishesGrid from './dishes-grid.es6';
import Ajax from '../../utils/ajax.es6';

export default {
    open () {
        Ajax.get('/api/dishes')
            .then((dishes) => {
                ReactDom.render(<DishesGrid dishes={dishes}/>, document.body)
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
