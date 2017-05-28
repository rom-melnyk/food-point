import State from '../state-ctor';

const state = new State({
    dishes: []
});
window.state = state; // TODO remove after debugging

export default state;
