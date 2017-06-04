import { get, post, put, del } from '../../utils/request';
import { route } from 'preact-router';
import store from '../store';
import { API, LINKS } from '../urls';

import { getDishesStructure } from './dishes-structure-actions';


function createDish(data) {
    return post(API.Dishes, data)
        .then(getDishesStructure)
        .then(() => route(LINKS.DishesList))
        .catch(console.error);
}


function updateDish(id, data) {
    return put(`${API.Dishes}?id=${id}`, data)
        .then(getDishesStructure)
        .then(() => route(LINKS.DishesList))
        .catch(console.error);
}


function deleteDish(id) {
    return del(`${API.Dishes}?id=${id}`)
        .then(getDishesStructure)
        .catch(console.error);
}


export {
    createDish,
    updateDish,
    deleteDish
};
