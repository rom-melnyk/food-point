import React from 'react';
import ReactDom from 'react-dom';
import { getState, addChangeListener, removeChangeListener } from './state.es6';
import DishesGrid from './components/dishes/dishes-grid.es6';
import Header from './components/header/header.es6';
import Footer from './components/footer/footer.es6';

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
            addChangeListener(this._updateState);
        },

        componentWillUnmount () {
            removeChangeListener(this._updateState);
        },

        render () {
            return (
                <div>
                    <Header></Header>
                    <DishesGrid dishes={this.state.dishes}/>
                    <Footer></Footer>
                </div>
            );
        },

        _updateState (state) {
            this.setState(state);
        }
    });

    ReactDom.render(<Main/>, container);
}

