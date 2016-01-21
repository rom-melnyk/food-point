import { getState, update, triggerChangeEvent } from '../../state.es6';
import { setModalCommand } from '../../actions.es6';
import Ajax from '../../utils/ajax.es6';
import FbLogin from '../../login-providers/fb-login.es6';

// ---------------------------------- me ----------------------------------
export function getMyData () {
    Ajax.get('/api/me')
        .then((response) => {
            updateMyData(response);
        })
        .catch((err) => {
            console.log(err);
        });
}

export function updateMyData (data) {
    update('me', data && !data.error ? data : {});
}

export function editMyData (id, data) {
    _doUserApiCall('put', `/api/users/${id}`, data, 'edit-me');
}

export function addAuthProvider (provider) {
    getState().authProviders.push(provider);
    triggerChangeEvent();
}

export function removeAuthProvider (provider) {
    const authProviders = getState().authProviders;
    const index = authProviders.indexOf(provider);
    if (index > -1) {
        authProviders.splice(index, 1);
        triggerChangeEvent();
    }
}

// ---------------------------------- private methods ----------------------------------
function _doUserApiCall (method, url, params, modalName) {
    setModalCommand(modalName, 'wait');

    Ajax[method](url, params)
        .then((res) => {
            return Ajax.get('/api/me');
        })
        .then((data) => {
            update('me', data && !data.error ? data : {});
            setModalCommand(modalName, 'close');
        })
        .catch((err) => {
            console.log(err);
        });
}
