import React from 'react';
import Row from './dish-row.es6';

export default React.createClass({
    render () {
        const rows = this.props.data.children.map((dish) => {
            return <Row key={dish.id} {...dish} role={this.props.user.role} order={this.props.order} />
        });

        return <ul>{rows}</ul>;
    }
});
