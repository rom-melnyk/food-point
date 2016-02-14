import React from 'react';
import { getVersionInfo } from '../../actions.es6';

export default React.createClass({
    componentDidMount () {
        getVersionInfo();
    },

    render () {
        let version = this.props.version;
        let versionElement = null;

        if (version.version || version.name) {
            versionElement = (
                <div className="version">
                    Версія&nbsp;
                    { version.version && <span className="number">{version.version}</span> }
                    { version.version && version.name && ' ' }
                    { version.name && <span className="name">({version.name})</span> }
                </div>
            );
        }

        return (
            <div className="footer">
                <div className="wrapper">
                    <div className="left">
                        FoodPoint, 2015-2016
                        {versionElement}
                    </div>
                    <div className="middle">
                        <span className="logo" />
                    </div>
                    <div className="right">
                        &copy; FoodPoint<br/>
                        Напишіть <a href="mailto:email.rom.melnyk@gmail.com?Subject=foodpoint.if.ua">розробнику,</a> якщо помітили баг
                    </div>
                </div>
            </div>
        );
    }
});
