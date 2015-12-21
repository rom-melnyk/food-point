import { getState, update, triggerChangeEvent } from '../../state.es6';
import Ajax from '../../utils/ajax.es6';
import { parseDishes, stringifyDishes, stringifyDish } from '../../formatters/dishes-formatter.es6';
import { getRoot } from '../../selectors/dishes-selectors.es6';
import Modals from '../modals/modals.es6';

const MODEL_NAME_EDIT_DISH = 'edit-dish';
const MODEL_NAME_DELETE_DISH = 'delete-dish';

export function getDishes () {
    _doGetAllDishes()
        .catch((err) => {
            console.log(err);
        });
}

export function openEditDishModal (dish) {
    if (!dish) {
        dish = {};
        dish.parent = getRoot();
    }

    Modals.open(MODEL_NAME_EDIT_DISH, dish);
}

export function createDish (dish) {
    Ajax.post('/api/dishes', stringifyDish(dish))
        .then((res) => {
            if (res.error) {
                console.log(res);
                throw new Error('Unable to create the dish'); // exit the Promise chain
            }

            // append child
            dish.id = res.insertId;
            dish.parent.children.push(dish);
            return Ajax.put(`/api/dishes/${dish.parent.id}`, stringifyDish(dish.parent));
        })
        .then(() => {
            return _doGetAllDishes();
        })
        .then(() => {
            setModalCommand(MODEL_NAME_EDIT_DISH, 'close');
        })
        .catch((err) => {
            console.log(err);
        });
}

export function updateDish (id, dish) {
    if (id === undefined) {
        _doDishApiCall('post', `/api/dishes`, dish, MODEL_NAME_EDIT_DISH);
    } else {
        _doDishApiCall('put', `/api/dishes/${id}`, dish, MODEL_NAME_EDIT_DISH);
    }
}

export function openDeleteDishModal (dish) {
    Modals.open(MODEL_NAME_DELETE_DISH, { id: dish.id, name: dish.name });
}

export function deleteDish (dish) {
    _doDishApiCall('delete', `/api/dishes/${dish.id}`, null, MODEL_NAME_DELETE_DISH);
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

function _doGetAllDishes () {
    return Ajax.get('/api/dishes')
        .then((dishes) => {
            dishes = parseDishes(dishes);
            update('dishes', dishes);
        });
}
