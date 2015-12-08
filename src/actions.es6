import { getState, update, triggerChangeEvent } from './state.es6';
import Ajax from './utils/ajax.es6';
import { parseAttribsForAllDishes, stringifyAttribsForOneDish } from './formatters/dishes-formatter.es6';
import FbLogin from './facebook/fb-login.es6';

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

export function getDishes () {
    Ajax.get('/api/dishes')
        .then((dishes) => {
            dishes = parseAttribsForAllDishes(dishes);
            update('dishes', dishes);
        })
        .catch((err) => {
            console.log(err);
        });
}

export function createDish (name, price) {
    _doDishApiCall('push', `/api/dishes`, {name, price}, 'edit-dish');
}

export function editDish (id, name, price) {
    if (typeof id === 'undefined') {
        _doDishApiCall('post', `/api/dishes`, {name, price}, 'edit-dish');
    } else {
        _doDishApiCall('put', `/api/dishes/${id}`, {name, price}, 'edit-dish');
    }
}

export function deleteDish (id) {
    _doDishApiCall('delete', `/api/dishes/${id}`, null, 'delete-dish');
}

export function moveDishUp (index) {
    const dishes = getState().dishes;
    const dish_1 = dishes[index - 1];
    const dish_2 = dishes[index];
    dishes.splice(index - 1, 2, dish_2, dish_1);
    dish_1.attr.ordinal = index;
    dish_2.attr.ordinal = index - 1;
    triggerChangeEvent();
}

export function setModalCommand (modalType, command) {
    update(`modals.${modalType}`, command);
}

export function updateRoute (route) {
    update('route', route);
}

// ---------------------------------- private methods ----------------------------------
function _doDishApiCall (method, url, params, modalName) {
    setModalCommand(modalName, 'wait');

    Ajax[method](url, params)
        .then((res) => {
            return Ajax.get('/api/dishes/');
        })
        .then((dishes) => {
            update('dishes', dishes);
            setModalCommand(modalName, 'close');
        })
        .catch((err) => {
            console.log(err);
        });
}
