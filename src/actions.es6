import { update } from './state.es6';

export function setModalCommand (modalType, command) {
    update(`modals.${modalType}`, command);
}

export function updateRoute (route) {
    update('route', route);
}
