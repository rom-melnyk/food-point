import Store from '../store-ctor';

const store = new Store({
    'dishes-structure': {},

    images: [],
    'image-picker': null,
});
window.store = store; // TODO remove after debugging

export default store;
