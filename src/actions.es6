import { update } from './state.es6';
import Ajax from './utils/ajax.es6';

export function getDishes () {
    Ajax.get('/api/dishes')
        .then((dishes) => {
            update('dishes', dishes);
        })
        .catch((err) => {
            console.log(err);
        });
}

export function editDish (id, name, price) {
    _doDishApiCall('put', `/api/dishes/${id}`, {name, price}, 'edit-dish');
}

export function deleteDish (id) {
    _doDishApiCall('delete', `/api/dishes/${id}`, null, 'delete-dish');
}

export function setModalCommand (modalType, command) {
    update(`modals.${modalType}`, command);
}

window.setModalCommand = setModalCommand;

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
