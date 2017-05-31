import { h, render, Component } from 'preact';
import { Router } from 'preact-router';

import store from './store';
import { LINKS } from './urls';

import AdminMenu from './admin-menu';
import DishesList from './dishes/dishes-list';
import DishForm from './dishes/dish-form';
import ImagesManager from './images/images-manager';

import { getDishes } from './dishes/dish-actions';
import { getImages } from './images/image-actions';

import { MODES as ImageManagerModes } from './images/image-constants';

class AdminApp extends Component {
    constructor() {
        super();
        Object.assign(this.state, store.state);
        this._setState = this.setState.bind(this);
    }

    componentDidMount() {
        store.addChangeListener(this._setState);
    }

    componentWillUnmount() {
        store.removeChangeListener(this._setState);
    }

    render(props, { dishes, images }) {
        return (
            <Router>
                <DishesList path={ LINKS.DishesList } dishes={ dishes } />
                <DishForm path={ LINKS.EditDish } />
                <DishForm path={ `${LINKS.EditDish}/:id` } />

                <ImagesManager path={ LINKS.ImagePicker } images={ images } mode={ ImageManagerModes.Picker } />
                <ImagesManager path={ LINKS.ImagesManager } images={ images } mode={ ImageManagerModes.Manage } />
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

    // prepare state
    getDishes();
    getImages();
}


export {
    startAdminApp
};
