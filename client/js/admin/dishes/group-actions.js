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


/**
 * @param {Number} id
 * @param {Object} data
 * @param {Number|null} newGroupId              if `null`, don't move to another group
 * @param {Boolean} [shouldNavigate=false]
 * @returns {Promise.<TResult>}
 */
function updateGroup(id, data, newGroupId, shouldNavigate = true) {
    return put(`${API.Groups}?id=${id}`, data)
        .then(() => moveToGroup(`g${id}`, newGroupId))
        .then(getDishesStructure)
        .then(() => {
            if (shouldNavigate) {
                route(LINKS.DishesList);
            }
        })
        .catch(console.error);
}


function deleteGroup(id) {
    const group = store.state.groups.find(g => g.id === id);
    if (!group) {
        return Promise.reject(`Group with id=${id} not found`);
    }

    const gid = `g${id}`;
    const parent = store.state.groups.find(g => g.items.indexOf(gid) !== -1);
    if (!parent) {
        return Promise.reject(`No parent group found containing the group with id=${id}`);
    }

    return removeFromParentGroup(gid)
        .then(() => addToGroup(group.items, parent.id))
        .then(() => del(`${API.Groups}?id=${id}`))
        .then(getDishesStructure)
        .catch(console.error);
}


// ---------------------------- helpers ----------------------------
function addToGroup(id, groupId) {
    const group = store.state.groups.find(g => g.id === groupId);
    if (!group) {
        return Promise.reject(`Group with id=${groupId} not found`);
    }
    id = Array.isArray(id) ? id : [ id ]; // support for bucket add (deleteGroup() scenario)
    group.items.push(...id);
    return put(`${API.Groups}?id=${groupId}`, { items: group.items });
}


function removeFromParentGroup(id) {
    const parent = store.state.groups.find(g => g.items.indexOf(id) !== -1);
    if (!parent) {
        return Promise.reject(`No parent group found containing the ${ /^g/.test(id) ? 'group' : 'dish' } with id=${id}`);
    }
    const currentItemIndex = parent.items.indexOf(id);
    if (currentItemIndex !== -1) {
        parent.items.splice(currentItemIndex, 1);
    }
    return put(`${API.Groups}?id=${parent.id}`, { items: parent.items });
}


function moveToGroup(id, newGroupId) {
    if (newGroupId === null) {
        return false;
    }

    const oldGroup = store.state.groups.find(g => g.items.indexOf(id) !== -1);
    if (!oldGroup) {
        return Promise.reject(`No group found containing the dish with id=${id}`);
    }

    if (oldGroup.id !== newGroupId) {
        return removeFromParentGroup(id)
            .then(() => addToGroup(id, newGroupId));
    }
}


export {
    createGroup,
    updateGroup,
    deleteGroup,

    addToGroup,
    removeFromParentGroup,
    moveToGroup
};
