import React from 'react';

export default React.createClass({
    render () {
        return (
            <div className="controls">
                <span className="button cancel" onClick={this.props.onBackHandler}></span>
                <span className="button submit" onClick={this.props.onOkHandler}></span>
            </div>
        );
    }
});
