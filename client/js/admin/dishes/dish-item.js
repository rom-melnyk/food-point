import { h, Component } from 'preact';
import { Button, Types } from '../../form-elements/buttons';
import { deleteDish } from './dish-actions';
import { route } from 'preact-router';
import { LINKS } from '../urls';
import { PATH } from '../images/image-constants';


class Dish extends Component {
    constructor() {
        super(...arguments);
        this.onEditClick = this.onEditClick.bind(this);
        this.onDelClick = this.onDelClick.bind(this);
    }

    render({ id, name, description, image, size, price, props }, state) {
        const imageComp = image
            ? <span className="image" style={ `background-image: url(${ PATH + image });` } title={ image } />
            : <span className="image none" />;

        return (
            <div className="dish has-hover-controls">
                <div className="row">
                    <div className="column-2">
                        <div className="image-wrapper">{ imageComp }</div>
                    </div>
                    <div className="column-8 all-text">
                        <span className="name">{ name }</span>
                        { size ? <span className="size">{ size }</span> : null }
                        <div className="description">{ description }</div>
                    </div>
                    <div className="column-2">
                        <div className="price">{ price }</div>
                    </div>
                </div>
                <div className="hover-controls">
                    <Button type={ Types.EDIT } onClick={ this.onEditClick } />
                    <Button type={ Types.DELETE } onClick={ this.onDelClick } />
                </div>
            </div>
        );
    }

    onEditClick(e) {
        route(`${LINKS.EditDish}/${this.props.id}`);
    }

    onDelClick(e) {
        if (window.confirm('Видалити цю страву?')) {
            deleteDish(this.props.id);
        }
    }
}


export default Dish;
