import React from 'react';
import Router from '../../router.es6';
import MeMenu from './me-menu.es6';

export default React.createClass({
    render () {
        const homeEl = <span className="home" onClick={this._onHomeClick}>FP</span>;
        const dishesEl = <span className="dishes" onClick={this._onDishesClick}>Меню</span>;
        const orderEl = <span className="order" onClick={this._onOrderClick}>Замовити їжу</span>;
        const meyOrdersEl = null; // <span className="my-orders">Мої замовлення</span>;
        const usersEl = null; // <span className="users">Користувачі</span>;
        return (
            <div className="header">
                <div className="wrapper">
                    <div className="app-menu">
                        {homeEl}
                        {dishesEl}
                        {orderEl}
                        {meyOrdersEl}
                        {usersEl}
                    </div>
                    <MeMenu me={this.props.me}/>
                </div>
            </div>
        );
    },

    _onHomeClick () {
        Router.goTo(Router.HOME);
    },

    _onDishesClick () {
        Router.goTo(Router.DISHES);
    },

    _onOrderClick () {
        Router.goTo(Router.ORDER);
    }
});
