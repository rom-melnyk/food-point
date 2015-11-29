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
    Ajax.put(`/api/dishes/${id}`, {name, price})
        .then((res) => {
            return Ajax.get('/api/dishes/');
        })
        .then((dishes) => {
            update('dishes', dishes);
        })
        .catch((err) => {
            console.log(err);
        });
}
