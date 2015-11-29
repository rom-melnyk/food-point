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
