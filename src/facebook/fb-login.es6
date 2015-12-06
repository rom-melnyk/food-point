import Ajax from '../utils/ajax.es6';

export default {
    init: _init,
    checkLoginState: _checkLoginState
};

function _init () {
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '1649156238676800',
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

function _checkLoginState() {
    return new Promise((resolve) => {
            FB.getLoginStatus((response) => {
                resolve(response);
            });
        }).then((response) => {
            return response.status === 'connected';
        });
}

//FB.api('/me', function(response) {
//    console.log('Successful login for: ' + response.name);
//});
