import { h, Component } from 'preact';
import { toggleDishEdit, updateDish, createDish } from './actions';

const FIELDS = [ 'name', 'description', 'size', 'price' ];


class DishForm extends Component {
    constructor() {
        super(...arguments);
        this.onBackClick = this.onBackClick.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
    }

    render(props/*{ id, name, description, image, size, price, props }*/, state) {
        const formComps = FIELDS.map(field => (
            <div className="row">
                <div className="label column-1">{ this.getFormLabelName(field) }</div>
                <div className="label column-3">{ this.getFormInputElement(field, props[field]) }</div>
            </div>
        ));
        return (
            <div class="dish form">
                { formComps }
                <div class="controls">
                    <span class="button grey" onClick={ this.onBackClick }>Back</span>
                    <span class="button green" onClick={ this.onSaveClick }>Save</span>
                </div>
            </div>
        );
    }

    getFormLabelName(field) {
        return ({
            name: 'Ім\'я',
            description: 'Опис',
            size: 'Порція',
            price: 'Ціна'
        })[field] || field;
    }

    getFormInputElement(field, value) {
        switch (field) {
            case 'description': return (
                <textarea
                    rows={ 3 }
                    name={ field }
                    onInput={ (e) => { this.state[field] = e.target.value; } }
                >
                    { value || '' }
                </textarea>
            );
            case 'price': return (
                <input
                    type="number"
                    name={ field }
                    value={ value || 0 }
                    onInput={ (e) => { this.state[field] = e.target.value; } }
                />
            );
            default:
        }
        return (
            <input
                type="text"
                name={ field }
                value={ value || '' }
                onInput={ (e) => { this.state[field] = e.target.value; } }
            />
        );
    }

    getFormInputValue(field) {
        switch (field) {
            case 'description': return <textarea rows={ 3 } name={ field }>{ value || '' }</textarea>;
            case 'price': return <input type="number" name={ field } value={ value || 0 }/>;
            default:
        }
        return <input type="text" name={ field } value={ value || '' }/>;
    }

    onBackClick(e) {
        toggleDishEdit(this.props.id, false);
    }

    onSaveClick(e) {
        const data = FIELDS.reduce((obj, field) => {
            obj[field] = this.state[field] === undefined ? this.props[field] : this.state[field];
            return obj;
        }, {});

        if (this.props.id) {
            updateDish(this.props.id, data);
        } else {
            createDish(data);
        }
    }

}


export default DishForm;
