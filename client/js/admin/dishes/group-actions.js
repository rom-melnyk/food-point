import { get, post, put, del } from '../../utils/request';
import { route } from 'preact-router';
import store from '../store';
import { API, LINKS } from '../urls';

import { getDishesStructure } from './dishes-structure-actions';


function createGroup(data) {
    return post(API.Groups, data)
        .then(getDishesStructure)
        .then(() => route(LINKS.DishesList))
        .catch(console.error);
}


function updateGroup(id, data, shouldNavigate = true) {
    return put(`${API.Groups}?id=${id}`, data)
        .then(getDishesStructure)
        .then(() => {
            if (shouldNavigate) {
                route(LINKS.DishesList);
            }
        })
        .catch(console.error);
}


function deleteGroup(id) {
    return del(`${API.Groups}?id=${id}`)
        .then(getDishesStructure)
        .catch(console.error);
}


export {
    createGroup,
    updateGroup,
    deleteGroup
};
