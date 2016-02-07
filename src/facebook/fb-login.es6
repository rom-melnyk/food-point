import Ajax from '../utils/ajax.es6';
import Config from '../../config.json';

const POLL_INTERVAL = 100; // ms
const APP_ID = Config.facebook['app-id'] + '';

export default {
    init: _init,
    doSafeRequest: _doSafeRequest,
    checkState: _checkState,
    authenticate: _authenticate,
    doLoginSequence: _doLoginSequence
};

function _init () {
    window.fbAsyncInit = function() {
        FB.init({
            appId      : APP_ID,
            cookie     : true,
            //xfbml      : true,
            version    : 'v2.5'
        });
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/uk_UA/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}

//FB.api('/me', function(response) {
//    console.log('Successful login for: ' + response.name);
//});

/**
 * @resolve {null} at this moment `window.FB` is defined
 * @returns {Promise}
 * @private
 */
function _doSafeRequest() {
    return new Promise((resolve, reject) => {
        function __poll__ () {
            if (window.FB) {
                resolve();
            } else {
                setTimeout(__poll__, POLL_INTERVAL);
            }
        }

        __poll__();
    });
}

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
    return _doSafeRequest()
        .then(_checkState)
        .then((state) => {
            return state.status === 'connected'
                ? _authenticate(state.authResponse)
                : state.status;
        })
        .catch((err) => {
            console.log(err);
        });
}
