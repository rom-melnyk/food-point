import { h, render, Component } from 'preact';


class AdminApp extends Component {
    render(props, state) {
        return (
            <h1>Dishes:</h1>
        );
    }
}


function startAdminApp() {
    if (!/admin.php$/.test(location.pathname)) {
        return;
    }

    const div = document.querySelector('.admin-app');
    render(<AdminApp/>, div);
}


export {
    startAdminApp
};
