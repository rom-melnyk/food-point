import { get, post, put, del } from '../../utils/request';
import { route } from 'preact-router';
import store from '../store';
import { API, LINKS } from '../urls';

function getDishes() {
    return get(API.Dishes)
        .then((dishes) => {
            store.update('dishes', dishes);
        })
        .catch(console.error);
}


function createDish(data) {
    return post(API.Dishes, data)
        .then(getDishes)
        .then(() => route(LINKS.DishesList))
        .catch(console.error);
}


function updateDish(id, data) {
    return put(`${API.Dishes}?id=${id}`, data)
        .then(getDishes)
        .then(() => route(LINKS.DishesList))
        .catch(console.error);
}


function deleteDish(id) {
    return del(`${API.Dishes}?id=${id}`)
        .then(getDishes)
        .catch(console.error);
}


export {
    getDishes,
    createDish,
    updateDish,
    deleteDish
};
