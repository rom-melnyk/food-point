import React from 'react';
import ReactDom from 'react-dom';
import RowControls from './dish-row-controls.es6';
import dom from '../../utils/dom.es6'

const COLLAPSED_CLASS_NAME = 'collapsed';
const COLLAPSED_TITLE = 'Розгорнути';
const EXPANDED_TITLE = 'Згорнути';

const Row = React.createClass({
    componentDidMount () {
        if (!this.props.children) {
            return;
        }

        this._$section = dom(ReactDom.findDOMNode(this));
        this._children = dom('.children', this._$section[0])[0];
        this._children.style.height = this._children.scrollHeight + 'px';
    },

    componentDidUpdate () {
        // update both section heights if the component migrated through 'em
        const childrenEl = this._children;

        if (!childrenEl) {
            return;
        }

        if (this.props.children && !this._$section.hasClass(COLLAPSED_CLASS_NAME)) {
            childrenEl.style.height = 'auto';
            setTimeout(() => { childrenEl.style.height = childrenEl.scrollHeight + 'px'; }, 1);
        }
    },

    componentWillUnmount () {
        this._$section = null;
        this._children = null;
    },

    render () {
        const toggleArea = this.props.children
            ? <span className="toggle" title={EXPANDED_TITLE} onClick={this._onToggleClick}></span>
            : null;

        //const ordinal = <span className="ordinal">{this.props.ordinal + 1})</span>;

        const orderArea = this.props.children
            ? null
            : (
                <span className="order">
                    <input type="checkbox"/>
                    <input type="text"/>
                    <span className="label">x</span>
                </span>
            );

        const name = <span className="name">{this.props.name}</span>;

        const description = this.props.description
            ? <span className="description" title={this.props.description}>{this.props.description}</span>
            : null;

        const image = this.props.image ? <span className="image">{this.props.image}</span> : null;

        const price = this.props.children ? null : <span className="price">{this.props.price} грн.</span>;

        const controlsArea = this.props.role === 'admin' ? <RowControls {...this.props}></RowControls> : null;

        const headerLeft = <div className="left">{orderArea}{toggleArea}{name}{description}{image}</div>;
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
        const role = this.props.role;
        if (children && children.length > 0) {
            const rows = children.map((dish) => {
                return <Row key={dish.id} {...dish} role={role}/>;
            });

            return <ul>{rows}</ul>;
        }

        return null;
    },

    _onToggleClick (e) {
        if (this._$section.hasClass(COLLAPSED_CLASS_NAME)) {
            this._$section.removeClass(COLLAPSED_CLASS_NAME);
            this._$section[0].setAttribute('title', COLLAPSED_TITLE);
            this._children.style.height = this._children.scrollHeight + 'px';
        } else {
            this._$section.addClass(COLLAPSED_CLASS_NAME);
            this._$section[0].setAttribute('title', EXPANDED_TITLE);
            this._children.style.height = 0;
        }
    },

    _$section: null, // this is Element[]
    _children: null // this is single Element
});

export default Row;
