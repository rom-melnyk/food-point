import React from 'react';
import RowControls from './dish-row-controls.es6';

const Row = React.createClass({
    render () {
        const toggleArea = this.props.children ? <span className="toggle"></span> : null;

        const description = this.props.description ? <span className="description">({this.props.description})</span> : null;

        const image = this.props.image ? <span className="image">{this.props.image}</span> : null;

        const ordinal = <span className="ordinal">{this.props.ordinal + 1})</span>;
        const name = <span className="name">{this.props.name}</span>;

        const price = this.props.children ? null : <span className="price">{this.props.price} грн.</span>;

        const controlsArea = true ? <RowControls {...this.props}></RowControls> : null;

        const headerLeft = <div className="left">{toggleArea}{ordinal}{name}{description}{image}</div>;
        const headerRight = <div className="right">{price}{controlsArea}</div>;

        return (
            <li className={this.props.children ? 'section' : ''}>
                <div className="header">
                    {headerLeft}
                    {headerRight}
                </div>
                {this.props.children
                    ? <div className="children">{this._getChildren(this.props.children)}</div>
                    : null
                }
            </li>
        );
    },

    _getChildren (children) {
        if (children) {
            const rows = children.map((dish) => {
                return <Row key={dish.id} {...dish}/>;
            });

            return <ul>{rows}</ul>;
        }

        return null;
    }
});

export default Row;
