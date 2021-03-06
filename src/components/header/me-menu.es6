import React from 'react';
import Router from '../../router.es6';
import { getMyData, loginViaFacebook, logout } from './me-actions.es6';
import Modals from '../modals/modals.es6';
import FbLogin from '../../login-providers/fb-login.es6';
import Constants from '../../constants/constants.es6';

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
        const authProviders = this.props.authProviders;

        let label = null;
        let providers = null;

        if (authProviders[0] === Constants.AUTH_PROVIDERS.PLEASE_WAIT) {
            label = <span className="please-wait"></span>;
        } else if (authProviders.length > 0) {
            label = 'Зайти через';
            providers = [];

            if (authProviders.indexOf(Constants.AUTH_PROVIDERS.FACEBOOK) > -1) {
                providers.push(
                    <span key={0} className="link fb-login" onClick={this._onFbLoginClick}></span>
                );
            }

        } else {
            label = 'Наразі неможливо зайти';
        }

        return <span className="login-section">{label}{providers}</span>;
    },

    _getPersonSection () {
        const initials = this.props.me.name.charAt(0).toUpperCase();
        const cssString = `.avatar::before { content: "${initials}"; }`;
        return (
            <span className="avatar-section">
                <span className="avatar" title={this.props.me.name} onClick={this._onPictureClick}></span>
                <style dangerouslySetInnerHTML={{__html: cssString}}></style>
                <span className="link logout" onClick={this._onLogoutClick} title="Вийти"></span>
            </span>
        );
    },

    _onPictureClick () {
        Modals.open('edit-me', this.props.me);
    },

    _onFbLoginClick () {
        loginViaFacebook();
    },

    _onLogoutClick () {
        logout();
    }
});
