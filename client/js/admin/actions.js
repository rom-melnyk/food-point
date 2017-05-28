import { get } from '../utils/request';
import state from './state';


function getDishes() {
    get('/php/api/dishes.php')
        .then((dishes) => {
            state.update('dishes', dishes);
        })
        .catch(console.error);
}


export {
    getDishes
};
