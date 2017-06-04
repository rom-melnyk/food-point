import { get, post, put, del } from '../../utils/request';
import store from '../store';
import { API, LINKS } from '../urls';


function getDishesStructure() {
    return get(API.DishesStructure)
        .then((structure) => {
            store.update('dishes-structure', structure);
        })
        .catch(console.error);
}


export { getDishesStructure };
