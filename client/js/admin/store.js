import Store from '../store-ctor';

const store = new Store({
    dishes: [],
    images: []
});
window.store = store; // TODO remove after debugging

export default store;
