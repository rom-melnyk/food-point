import { getState, update, triggerChangeEvent } from '../../state.es6';
import { setModalCommand } from '../../actions.es6';
import Ajax from '../../utils/ajax.es6';
import { parseDishes, stringifyDishes, stringifyDish } from '../../formatters/dishes-formatter.es6';
import { getRoot, getIndexById } from '../../selectors/dishes-selectors.es6';
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
            _handleResponseError(res, 'create', dish.name);

            // append child
            dish.id = res.insertId;
            dish.parent.children.push(dish);
            return Ajax.put(`/api/dishes/${dish.parent.id}`, stringifyDish(dish.parent));
        })
        .then((res) => {
            _handleResponseError(res, 'create', dish.name + '\'s parent(-s)');
            return _doGetAllDishes();
        })
        .then(() => {
            setModalCommand(MODEL_NAME_EDIT_DISH, 'close');
        })
        .catch((err) => {
            console.log(err);
        });
}

export function updateDish (dish, previousParent) {
    Ajax.put(`/api/dishes/${dish.id}`, stringifyDish(dish))
        .then((res) => {
            _handleResponseError(res, 'update', dish.name);

            if (dish.parent !== previousParent) {
                // remove child from one parent and append it to another
                const idx = getIndexById(dish.id, previousParent);
                previousParent.children.splice(idx, 1);
                dish.parent.children.push(dish);
                return Promise.all([
                    Ajax.put(`/api/dishes/${previousParent.id}`, stringifyDish(previousParent)),
                    Ajax.put(`/api/dishes/${dish.parent.id}`, stringifyDish(dish.parent))
                ]);
            }

            return {}; // proceed with further steps
        })
        .then((res) => {
            if (res.length === 2 && (res.find(r => r.error) > -1)) {
                // emulating error after receiving result of Promise.all
                res.error = true;
            }
            _handleResponseError(res, 'update', dish.name + '\'s parent(-s)');

            return _doGetAllDishes();
        })
        .then(() => {
            setModalCommand(MODEL_NAME_EDIT_DISH, 'close');
        })
        .catch((err) => {
            console.log(err);
        });
}

export function openDeleteDishModal (dish) {
    Modals.open(MODEL_NAME_DELETE_DISH, dish);
}

export function deleteDish (dish) {
    Ajax.delete(`/api/dishes/${dish.id}`)
        .then((res) => {
            _handleResponseError(res, 'delete', dish.name);

            // remove child
            const idx = getIndexById(dish.id, dish.parent);
            dish.parent.children.splice(idx, 1);
            return Ajax.put(`/api/dishes/${dish.parent.id}`, stringifyDish(dish.parent));
        })
        .then((res) => {
            _handleResponseError(res, 'delete', dish.name + '\'s parent(-s)');
            return _doGetAllDishes();
        })
        .then(() => {
            setModalCommand(MODEL_NAME_DELETE_DISH, 'close');
        })
        .catch((err) => {
            console.log(err);
        });
}

export function moveDishUp (parent, index) {
    const dish_1 = parent.children[index - 1];
    const dish_2 = parent.children[index];
    parent.children.splice(index - 1, 2, dish_2, dish_1);
    dish_1.ordinal = index;
    dish_2.ordinal = index - 1;
    triggerChangeEvent();

    Ajax.put(`/api/dishes/${parent.id}`, stringifyDish(parent))
        .then((res) => {
            // TODO toast msg from this
            console.log(`"${parent.name}" updated`);
        })
        .catch((err) => {
            console.log(err);
        });
}

// ---------------------------------- private methods ----------------------------------
function _handleResponseError(res, method, message = '') {
    if (res.error) {
        console.log(res);
        throw new Error(`Unable to ${method} the dish "${message}"`); // exit the Promise chain
    }
}

function _doGetAllDishes () {
    return Ajax.get('/api/dishes')
        .then((dishes) => {
            _handleResponseError(dishes, 'retrieve', 'all dishes');

            dishes = parseDishes(dishes);
            update('dishes', dishes);
        });
}
