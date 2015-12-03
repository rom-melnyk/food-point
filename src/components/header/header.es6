import React from 'react';
import Router from '../../router.es6';
import Modals from '../modals/modals.es6';
import FbLogin from '../../facebook/fb-login.es6';

export default React.createClass({
    componentDidMount () {
        FbLogin.init();
    },

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
                <div className="me">
                    <span className="fb-login" onClick={this._onFbLoginClick}>Зайти через Facebook</span>
                </div>
            </div>
        );
    },

    _onHomeClick () {
        Router.goTo(Router.HOME);
    },

    _onMenuClick () {
        Router.goTo(Router.DISHES);
    },

    _onFbLoginClick () {
        FB.login(
            FbLogin.checkLoginState,
            {
                scope: 'public_profile,email',
                auth_type: 'rerequest'
            }
        );
    }
});
