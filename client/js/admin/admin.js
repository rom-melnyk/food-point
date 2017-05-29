import { h, render, Component } from 'preact';
import DishesList from './dishes-list';
import state from './state';

import { getDishes } from './actions';

class AdminApp extends Component {
    constructor() {
        super();
        Object.assign(this.state, state.state);
        this._setState = this.setState.bind(this);
    }

    componentDidMount() {
        state.addChangeListener(this._setState);
    }

    componentWillUnmount() {
        state.removeChangeListener(this._setState);
    }

    render(props, { dishes }) {
        return (
            <DishesList dishes={ dishes } />
        );
    }
}


function startAdminApp() {
    if (!/^\/admin/.test(location.pathname)) {
        return;
    }

    const div = document.querySelector('.admin-app');
    render(<AdminApp />, div);
    getDishes();
}


export {
    startAdminApp
};
