import { update } from './state.es6';
import versions from '../versions.json';

export function setModalCommand (modalType, command) {
    update(`modals.${modalType}`, command);
}

export function updateRoute (route) {
    update('route', route);
}

export function getVersionInfo () {
    let version = null;

    try {
        update('version', versions.shift());
    } catch (e) {}
}
