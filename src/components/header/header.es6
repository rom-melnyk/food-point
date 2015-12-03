import React from 'react';
import Modals from '../modals/modals.es6';
import FbLogin from '../../facebook/fb-login.es6';

export default React.createClass({
    componentDidMount () {
        // ------------- Facebook scripts -------------
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '1649156238676800',
                cookie     : true,
                xfbml      : true,
                version    : 'v2.5'
            });

            FB.getLoginStatus(function(response) {
                FbLogin.statusChangeCallback(response);
            });
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/uk_UA/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        // ------------- End of Facebook scripts -------------
    },

    render () {
        return (
            <div className="header">
                <div className="app-menu">
                    <span className="main">FP</span>
                    <span className="menu">Меню</span>
                    <span className="order">Замовти їжу</span>
                    <span className="my-orders">Мої замовлення</span>
                    <span className="users">Користувачі</span>
                </div>
                <div className="me">
                    <span className="fb-login" onClick={this._onFbLoginClick}>Зайти через Facebook</span>
                </div>
            </div>
        );
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
