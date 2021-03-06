import React from 'react';
import ReactDom from 'react-dom';

export default React.createClass({
    componentDidMount () {
        const container = ReactDom.findDOMNode(this);
        this._inputElement = container.querySelector(`[name=${this.props.name}]`);
    },

    componentWillMount () {
        this._inputElement = null;
    },

    render () {
        const beforeInput = this.props.content && this.props.content.beforeInput;
        const afterInput = this.props.content && this.props.content.afterInput;
        const input = this.props.content && this.props.content.input || <input type="text" name={this.props.name}/>;

        return (
            <div className="input-section">
                <label>{this.props.label}</label>
                <span className="input-wrapper">
                    {beforeInput}
                    {input}
                    {afterInput}
                </span>
            </div>
        );
    },

    getValue () {
        if (!this._inputElement) {
            return null;
        }

        switch (this._inputElement.type) {
            case 'checkbox':
                return this._inputElement.checked;
            default:
                return this._inputElement.value;
        }
    },

    setValue (value = '') {
        if (!this._inputElement) {
            return;
        }

        switch (this._inputElement.type) {
            case 'checkbox':
                this._inputElement.checked = !!value;
                break;
            default:
                return this._inputElement.value = value;
        }
    },

    _inputElement: null
});
