import React from 'react';
import Row from './dishes-row.es6';

export default React.createClass({
    render () {
        return (
            <div className="page dishes">
                <h1>Страви</h1>
                <ul>
                    <Row name="Name" price="23" id="1"/>
                </ul>
            </div>
        );
    }
});
