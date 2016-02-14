import initialState from './initial-state.es6';

const _state = initialState;

const _listeners = [];

export function getState () {
    return _state;
}

export function addChangeListener (callback) {
    if (_listeners.indexOf(callback) === -1 && typeof callback === 'function') {
        _listeners.push(callback);
    }
}

export function removeChangeListener (callback) {
    const index = _listeners.indexOf(callback);
    if (index !== -1) {
        _listeners.splice(index, 1);
    }
}

export function update (path, value, root = _state) {
    const dotPosition = path.indexOf('.');

    if (dotPosition === -1) {
        root[path] = value;

        triggerChangeEvent();
    } else {
        const key = path.substring(0, dotPosition);
        const reminder = path.substr(dotPosition + 1);
        if (typeof root[key] !== 'object') {
            root[key] = {};
        }
        update(reminder, value, root[key]);
    }
}

export function triggerChangeEvent () {
    _listeners.forEach((listener) => {
        listener(_state);
    })
}
