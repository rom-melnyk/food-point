import { updateRoute } from './actions.es6';

export default {
    HOME: '',
    ME: 'me',
    DISHES: 'dishes',
    ORDER: 'order',
    MY_ORDERS: 'my-orders',
    USERS: 'users',
    goTo: _goTo,
    getCurrent: _getCurrent
}

function _goTo (route) {
    window.location.hash = route ? '#' + route : '';
    updateRoute(route);
}

function _getCurrent () {
    const route = window.location.hash.replace(/^#/, '');
    return route;
}
