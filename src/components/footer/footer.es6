import React from 'react';

export default React.createClass({
    render () {
        return (
            <div className="footer">
                <div className="wrapper">
                    <div className="left">FoodPoint, 2015-2016</div>
                    <div className="middle">
                        <span className="logo"></span>
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
