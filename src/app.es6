import React from 'react';
import ReactDom from 'react-dom';
import { getState, addChangeListener, removeChangeListener } from './state.es6';
import Router from './router.es6';
import DishesGrid from './components/dishes/dishes-grid.es6';
import Home from './components/home/home.es6';
import Header from './components/header/header.es6';
import Footer from './components/footer/footer.es6';

import FbLogin from './facebook/fb-login.es6';

window.FoodPoint = {
    init: () => {
        FbLogin.init();
        _init();
    }
};

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
        const view = this._getView();
        return (
            <div className="application">
                <Header me={this.state.me} />
                {view}
                <Footer />
            </div>
        );
    },

    _updateState (state) {
        this.setState(state);
    },

    _getView () {
        if (this.state.route === Router.DISHES) {
            return <DishesGrid dishes={this.state.dishes}/>;
        } else if (this.state.route === Router.HOME) {
            return <Home/>;
        }

        return null;
    }
});

function _init () {
    const container = document.createElement('div');
    container.id = 'application-container';
    document.body.appendChild(container);

    ReactDom.render(<Main/>, container);
}

