import Ajax from '../utils/ajax.es6';
import { addAuthProvider, removeAuthProvider } from '../components/header/me-actions.es6';
import Constants from '../constants/constants.es6';
import Config from '../../config.json';

const MAX_LOADING_TIME = 15 * 1000; // ms
let APP_ID;
let APP_LOCALE;

try {
    APP_ID = Config.facebook['api-id'] + '';
    APP_LOCALE = Config.facebook.locale;
} catch (e) {
    throw new Error('Make sure that "config.json" exists and contains both "facebook"."app-id" and "facebook"."locale"');
}

let checkTimeoutId = null;

export default {
    init: _init,
    checkState: _checkState,
    authenticate: _authenticate,
    doLoginSequence: _doLoginSequence
};

function _init () {
    window.fbAsyncInit = function() {
        FB.init({
            appId      : APP_ID,
            //cookie     : true,
            //xfbml      : true,
            version    : 'v2.5'
        });

        clearTimeout(checkTimeoutId);
        checkTimeoutId = null;
        addAuthProvider(Constants.AUTH_PROVIDERS.FACEBOOK);
        removeAuthProvider(Constants.AUTH_PROVIDERS.PLEASE_WAIT);
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = `//connect.facebook.net/${APP_LOCALE}/sdk.js`;
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    checkTimeoutId = setTimeout(() => {
        if (!window.FB) {
            removeAuthProvider(Constants.AUTH_PROVIDERS.PLEASE_WAIT);
        }
    }, MAX_LOADING_TIME);
}

//FB.api('/me', function(response) {
//    console.log('Successful login for: ' + response.name);
//});

function _checkState() {
    return new Promise((resolve, reject) => {
        FB.getLoginStatus((response) => {
            resolve(response);
        });
    });
}

function _authenticate(authResponse) {
    return authResponse && authResponse.userID && authResponse.accessToken
        ? Ajax.post('/api/authenticate', {
                authType: 'facebook',
                userId: authResponse.userID,
                accessToken: authResponse.accessToken
            })
        : {error: true, message: 'Not logged into Facebook', debug: null};
}

function _doLoginSequence() {
    return _checkState()
        .then((state) => {
            return state.status === 'connected'
                ? _authenticate(state.authResponse)
                : state.status;
        })
        .catch((err) => {
            console.log(err);
        });
}
