import React from 'react';
import Router from '../../router.es6';
import { getState } from '../../state.es6';
import { getMyData, updateMyData } from '../../actions.es6';
import Modals from '../modals/modals.es6';
import FbLogin from '../../facebook/fb-login.es6';

export default React.createClass({
    componentDidMount () {
        getMyData();
    },

    render () {
        return (
            <div className="me">
                {this.props.me.id ? this._getPersonSection() : this._getLoginSection()}
            </div>
        );
    },

    _getLoginSection () {
        return (
            <span className="login-section">
                Зайти через
                <span className="fb-login" onClick={this._onFbLoginClick}></span>
            </span>
        );
    },

    _getPersonSection () {
        const initials = this.props.me.name.charAt(0).toUpperCase();
        return (
            <span className="picture-section">
                <span className="picture" title={this.props.me.name}>{initials}</span>
                <span className="logout" onClick={this._onLogoutClick} title="Вийти"></span>
            </span>
        );
    },

    _onFbLoginClick () {
        FB.login(
            () => {
                FbLogin.doLoginSequence()
                    .then((response) => {
                        updateMyData(response);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            {
                scope: 'public_profile,email',
                auth_type: 'rerequest'
            }
        );
    },

    _onLogoutClick () {
        const beginOfTime = new Date(0).toString();
        document.cookie = `session=; expires=${beginOfTime};`;
    }
});
