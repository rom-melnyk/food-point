import Store from '../store-ctor';

const store = new Store({
    dishes: []
});
window.state = store; // TODO remove after debugging

export default store;
