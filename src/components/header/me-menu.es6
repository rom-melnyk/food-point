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
        const meOrLoginButton = this.props.me.id
            ? <span className="picture">{this._getPersonInitials()}</span>
            : <span className="fb-login" onClick={this._onFbLoginClick}>Зайти через Facebook</span>;

        return (
            <div className="me">
                {meOrLoginButton}
            </div>
        );
    },

    _getPersonInitials () {
        return this.props.me.name.charAt(0).toUpperCase();
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
    }
});
