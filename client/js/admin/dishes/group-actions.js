import { get, post, put, del } from '../../utils/request';
import { route } from 'preact-router';
import store from '../store';
import { API, LINKS } from '../urls';

import { getDishesStructure } from './dishes-structure-actions';


function createGroup(data, parentId) {
    return post(API.Groups, data)
        .then(response => addToGroup(`g${response.result}` /* => inserted_id */, parentId))
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
    console.log('// TODO move dishes to parent');
    return;
    return del(`${API.Groups}?id=${id}`)
        .then(getDishesStructure)
        .catch(console.error);
}


// ---------------------------- helpers ----------------------------
function addToGroup(id, groupId) {
    const group = store.state.groups.find(g => g.id === groupId);
    if (!group) {
        return Promise.reject(`Group with id=${groupId} not found`);
    }
    group.items.push(id);
    return updateGroup(groupId, { items: group.items });
}


function removeFromGroup(id) {
    const group = store.state.groups.find(g => g.items.indexOf(id) !== -1);
    if (!group) {
        return Promise.reject(`No group found containing the dish with id=${id}`);
    }
    const currentDishIndex = group.items.findIndex(item => item === id);
    if (currentDishIndex !== -1) {
        group.items.splice(currentDishIndex, 1);
    }
    return updateGroup(group.id, { items: group.items });
}
export {
    createGroup,
    updateGroup,
    deleteGroup,

    addToGroup,
    removeFromGroup
};
