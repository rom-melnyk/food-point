import { getState, update, triggerChangeEvent } from '../../state.es6';
import { setModalCommand } from '../../actions.es6';
import Ajax from '../../utils/ajax.es6';

// ---------------------------------- order ----------------------------------
/*export function getMyData () {
    Ajax.get('/api/me')
        .then((response) => {
            updateMyData(response);
        })
        .catch((err) => {
            console.log(err);
        });
}*/

export function updateDishInTheOrder (dish, isChecked, count) {
    const order = getState().order.what;
    const index = order.findIndex((item) => item.dish.id === dish.id);

    if (index > -1) {
        if (isChecked) {
            order[index].count = count;
        } else {
            order.splice(index, 1);
        }
    } else {
        order.push({ dish, count });
    }

    triggerChangeEvent();
}

// ---------------------------------- private methods ----------------------------------
/*function _doOrderApiCall (method, url, params, modalName) {
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
}*/
