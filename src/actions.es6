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
    setModalCommand('edit-dish', 'wait');

    Ajax.put(`/api/dishes/${id}`, {name, price})
        .then((res) => {
            return Ajax.get('/api/dishes/');
        })
        .then((dishes) => {
            update('dishes', dishes);
            setModalCommand('edit-dish', 'close');
        })
        .catch((err) => {
            console.log(err);
        });
}

export function setModalCommand (modalType, command) {
    update(`modals.${modalType}`, command);
}

window.setModalCommand = setModalCommand;
