import { get, post, put, del } from '../../utils/request';
import { route } from 'preact-router';
import store from '../store';
import { API, LINKS } from '../urls';

function getGroups() {
    return get(API.Groups)
        .then((dishes) => {
            store.update('groups', dishes);
        })
        .catch(console.error);
}


function createGroup(data) {
    return post(API.Groups, data)
        .then(getGroups)
        .then(() => {}/*route(LINKS.GroupsList)*/)
        .catch(console.error);
}


function updateGroup(id, data) {
    return put(`${API.Groups}?id=${id}`, data)
        .then(getGroups)
        .then(() => {}/*route(LINKS.GroupsList)*/)
        .catch(console.error);
}


function deleteGroup(id) {
    return del(`${API.Groups}?id=${id}`)
        .then(getGroups)
        .catch(console.error);
}


export {
    getGroups,
    createGroup,
    updateGroup,
    deleteGroup
};
