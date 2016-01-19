import Ajax from '../utils/ajax.es6';
import { addAuthProvider, removeAuthProvider } from '../components/header/me-actions.es6';
import Constants from '../constants/constants.es6';

const MAX_LOADING_TIME = 15 * 1000; // ms
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
            appId      : '1649156238676800',
            cookie     : true,
            //xfbml      : true,
            version    : 'v2.5'
        });

        clearTimeout(checkTimeoutId);
        checkTimeoutId = null;
        removeAuthProvider(Constants.AUTH_PROVIDERS.PLEASE_WAIT);
        addAuthProvider(Constants.AUTH_PROVIDERS.FACEBOOK);
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/uk_UA/sdk.js";
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
