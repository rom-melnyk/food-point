import { h, Component } from 'preact';


function _emptyFn () {}


const Types = {
    BACK: {
        title: 'Назад',
        spanClassName: 'grey',
        iconClassName: 'long-arrow-left',
        onClick: (e) => {
            history.back();
        }
    },
    OK: {
        title: 'Зберегти',
        spanClassName: 'green',
        iconClassName: 'check'
    },
    DELETE: {
        title: 'Видалити',
        spanClassName: 'red',
        iconClassName: 'times'
    },
    EDIT: {
        title: 'Правити',
        spanClassName: 'blue',
        iconClassName: 'pencil'
    },
    ADD: {
        title: 'Додати',
        spanClassName: 'green',
        iconClassName: 'plus'
    },
    PICK: {
        title: 'Вибрати',
        spanClassName: 'blue',
        iconClassName: 'picture-o'
    }
};


class Button extends Component {
    static get Types() {
        return Types;
    }

    render({ type = {}, onClick, title, showTitle = false, narrow = false, spanClassName, iconClassName }) {
        onClick = typeof onClick === 'function'
            ? onClick
            : (type.onClick || _emptyFn);

        title = title || type.title;

        spanClassName = spanClassName || type.spanClassName;
        spanClassName = 'button '
            + (showTitle ? 'with-title ' : '')
            + (narrow ? 'narrow ' : '')
            + (spanClassName ? spanClassName : '');

        iconClassName = `fa fa-${iconClassName || type.iconClassName}`;

        return (
            <span className={ spanClassName } onClick={ onClick } title={ title }>
                <i className={ iconClassName } />
                { showTitle ? title : '' }
            </span>
        );
    }
}


export {
    Button,
    Types
}
