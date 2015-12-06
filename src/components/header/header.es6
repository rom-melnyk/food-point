import React from 'react';
import Router from '../../router.es6';
import MeMenu from './me-menu.es6';

export default React.createClass({
    render () {
        return (
            <div className="header">
                <div className="app-menu">
                    <span className="home" onClick={this._onHomeClick}>FP</span>
                    <span className="menu" onClick={this._onMenuClick}>Меню</span>
                    <span className="order">Замовити їжу</span>
                    <span className="my-orders">Мої замовлення</span>
                    <span className="users">Користувачі</span>
                </div>
                <MeMenu me={this.props.me} />
            </div>
        );
    },

    _onHomeClick () {
        Router.goTo(Router.HOME);
    },

    _onMenuClick () {
        Router.goTo(Router.DISHES);
    }
});
