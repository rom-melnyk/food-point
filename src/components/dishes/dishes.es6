import React from 'react'; // must be defined for ReactDom
import ReactDom from 'react-dom';
import DishesGrid from './dishes-grid.es6';

export default {
    open () {
        ReactDom.render(<DishesGrid />, document.body)
    }
};
