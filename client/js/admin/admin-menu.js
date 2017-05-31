import { h, Component } from 'preact';
import { route } from 'preact-router';
import { LINKS } from './urls';

const MENU = [
    {
        text: 'Страви',
        link: LINKS.DishesList
    },
    {
        text: 'Зображення',
        link: LINKS.ImageManager
    },
    {
        text: 'Замовлення',
        link: LINKS.DishesList
    }
];


class AdminMenu extends Component {
    render(props, state) {
        const items = MENU.map(({ text, link }) => {
            const onClick = () => { route(link); };
            const className = 'button grey';
            return <span className={ className } onClick={ onClick }>{ text }</span>;
        });
        return <div className="site-menu">{ items }</div>;
    }
}


export default AdminMenu;