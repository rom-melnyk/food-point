import { getState, update, triggerChangeEvent } from '../../state.es6';
import Ajax from '../../utils/ajax.es6';
import { parseDishes, stringifyDishes, stringifyDish } from '../../formatters/dishes-formatter.es6';

export function getDishes () {
    Ajax.get('/api/dishes')
        .then((dishes) => {
            dishes = parseDishes(dishes);
            update('dishes', dishes);
        })
        .catch((err) => {
            console.log(err);
        });
}

export function editDish (id, data) {
    if (id === undefined) {
        _doDishApiCall('post', `/api/dishes`, data, 'edit-dish');
    } else {
        _doDishApiCall('put', `/api/dishes/${id}`, data, 'edit-dish');
    }
}

export function deleteDish (id) {
    _doDishApiCall('delete', `/api/dishes/${id}`, null, 'delete-dish');
}

export function moveDishUp (parent, index) {
    const dish_1 = parent.children[index - 1];
    const dish_2 = parent.children[index];
    parent.children.splice(index - 1, 2, dish_2, dish_1);
    dish_1.ordinal = index;
    dish_2.ordinal = index - 1;
    triggerChangeEvent();

    parent = stringifyDish(parent);
    Ajax.put(`/api/dishes/${parent.id}`, parent)
        .then((res) => {
            console.log(`"${parent.name}" updated`);
        })
        .catch((err) => {
            console.log(err);
        });
}

export function setModalCommand (modalType, command) {
    update(`modals.${modalType}`, command);
}

export function updateRoute (route) {
    update('route', route);
}

// ---------------------------------- private methods ----------------------------------
function _doDishApiCall (method, url, data, modalName) {
    setModalCommand(modalName, 'wait');

    Ajax[method](url, data)
        .then((res) => {
            return Ajax.get('/api/dishes');
        })
        .then((dishes) => {
            dishes = parseDishes(dishes);
            update('dishes', dishes);
            setModalCommand(modalName, 'close');
        })
        .catch((err) => {
            console.log(err);
        });
}
