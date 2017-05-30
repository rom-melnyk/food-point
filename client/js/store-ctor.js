class State {
    constructor(initial = {}) {
        this._state = Object.assign({}, initial);
        this._listeners = [];
    }

    get state() {
        return this._state;
    }

    addChangeListener(callback) {
        if (this._listeners.indexOf(callback) === -1 && typeof callback === 'function') {
            this._listeners.push(callback);
        }
    }

    removeChangeListener(callback) {
        const index = this._listeners.indexOf(callback);
        if (index !== -1) {
            this._listeners.splice(index, 1);
        }
    }

    update(path, value) {
        const chunks = path
            .split('.')
            .map(ch => {
                const num = +ch;
                return isNaN(num) ? ch : num;
            });

        let root = this._state;
        let chunk = chunks.shift();
        while (chunks.length) {
            if (!root[chunk]) {
                root[chunk] = typeof chunks[0] === 'number' ? [] : {};
            }
            root = root[chunk];
            chunk = chunks.shift();
        }

        root[chunk] = value;
        this.triggerChangeEvent();
    }

    triggerChangeEvent() {
        this._listeners.forEach((listener) => {
            listener(this._state);
        })
    }
}

export default State;
