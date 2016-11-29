import React from 'react';
import Row from './dish-row.es6';

export default React.createClass({
    render () {
        const rows = this.props.dishes.children.map((dish) => {
            return <Row key={dish.id} {...dish} role={this.props.role} order={this.props.order} />
        }, this);

        return <ul>{rows}</ul>;
    }
});
