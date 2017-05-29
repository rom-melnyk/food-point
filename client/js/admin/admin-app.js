import { h, render, Component } from 'preact';
import { Router } from 'preact-router';

import state from './state';
import { LINKS } from './urls';

import DishesList from './dishes/dishes-list';
import DishForm from './dishes/dish-form';

import { getDishes } from './dishes/actions';

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
            <Router>
                <DishesList path={ LINKS.DishesList } dishes={ dishes } />
                <DishForm path={ LINKS.EditDish } />
                <DishForm path={ `${LINKS.EditDish}/:id` } />
            </Router>
        );
    }
}


function startAdminApp() {
    if (!/^\/admin/.test(location.pathname)) {
        return;
    }

    history.pushState(null, null, LINKS.DishesList); // redirect to DishesList
    const div = document.querySelector('.admin-app');
    render(<AdminApp />, div);
    getDishes();
}


export {
    startAdminApp
};
