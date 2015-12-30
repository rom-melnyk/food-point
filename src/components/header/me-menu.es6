import React from 'react';
import Router from '../../router.es6';
import { getMyData, updateMyData } from './me-actions.es6';
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
                <span className="link fb-login" onClick={this._onFbLoginClick}></span>
            </span>
        );
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
        // TODO add safe FB call
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
