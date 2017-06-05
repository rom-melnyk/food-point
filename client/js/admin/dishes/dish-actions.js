import { get, post, put, del } from '../../utils/request';
import { route } from 'preact-router';
import { API, LINKS } from '../urls';
import { addToGroup, removeFromGroup, moveToGroup } from './group-actions';

import { getDishesStructure } from './dishes-structure-actions';


function createDish(data, groupId) {
    return post(API.Dishes, data)
        .then(response => addToGroup(response.result /* => inserted_id */, groupId))
        .then(getDishesStructure)
        .then(() => route(LINKS.DishesList))
        .catch(console.error);
}


function updateDish(id, data, newGroupId) {
    return put(`${API.Dishes}?id=${id}`, data)
        .then(() => moveToGroup(id, newGroupId))
        .then(getDishesStructure)
        .then(() => route(LINKS.DishesList))
        .catch(console.error);
}


function deleteDish(id) {
    return del(`${API.Dishes}?id=${id}`)
        .then(() => removeFromGroup(id))
        .then(getDishesStructure)
        .catch(console.error);
}


export {
    createDish,
    updateDish,
    deleteDish
};
