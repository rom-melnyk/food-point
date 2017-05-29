import { h, render, Component } from 'preact';
import { Router } from 'preact-router';

import state from './state';
import { LINKS } from './urls';

import AdminMenu from './admin-menu';
import DishesList from './dishes/dishes-list';
import DishForm from './dishes/dish-form';
import ImageForm from './images/image-form';

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
                <ImageForm path={ LINKS.ImagesList } />
            </Router>
        );
    }
}


function startAdminApp() {
    if (!/^\/admin/.test(location.pathname)) {
        return;
    }

    const menuDiv = document.querySelector('header > nav');
    const appDiv = document.querySelector('.admin-app');
    render(<AdminMenu />, menuDiv);
    render(<AdminApp />, appDiv);
    getDishes();
}


export {
    startAdminApp
};
