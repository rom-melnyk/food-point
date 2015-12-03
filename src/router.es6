import { updateRoute } from './actions.es6';

export default {
    HOME: '',
    ME: 'me',
    DISHES: 'dishes',
    ORDER: 'order',
    MY_ORDERS: 'my-orders',
    USERS: 'users',
    goTo: _goTo
}

function _goTo (route) {
    window.location.hash = route ? '#' + route : '';
    updateRoute(route);
}
