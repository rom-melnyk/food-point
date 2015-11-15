const express = require('express');
const config = require('./package.json').config;
const users = require('./api/users.es6');

const app = express();

app.use(express.static(__dirname + '/static'));

app.get('/api/users', users.getUsers);

const server = app.listen(config.port, () => {
    const address = server.address();
    console.log(
        'Listening the http://%s:%s/',
        (address.address === '::' ? 'localhost' : address.address),
        address.port
    );
});
