import React from 'react';

export default React.createClass({
    render () {
        return (
            <li>
                <div className="left">
                    <span className="name">{this.props.name}</span>
                </div>
                <div className="right">
                    <span className="price"> {this.props.price}</span>
                    <span className="controls">
                        <span className="button edit icon-edit" data-id="{this.props.id}"></span>
                        <span className="button delete icon-x" data-id="{this.props.id}"></span>
                    </span>
                </div>
            </li>
        );
    }
});
