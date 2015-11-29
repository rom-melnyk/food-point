import React from 'react';
import ReactDom from 'react-dom';
import { getState, addChengeListener, removeChengeListener } from './state.es6';
import DishesGrid from './components/dishes/dishes-grid.es6';

window.FoodPoint = {
    init: () => {
        _init();
    }
};

function _init () {
    const container = document.createElement('div');
    container.id = 'main';
    document.body.appendChild(container);

    const Main = React.createClass({
        getInitialState () {
            return getState();
        },

        componentDidMount () {
            addChengeListener(this._updateState);
        },

        componentWillUnmount () {
            removeChengeListener(this._updateState);
        },

        render () {
            return (
                <div>
                    <DishesGrid dishes={this.state.dishes}/>
                </div>
            );
        },

        _updateState (state) {
            this.setState(state);
        }
    });

    ReactDom.render(<Main/>, container);
}

