const express = require('express');
const config = require('./package.json').config;
const bodyParser = require('body-parser');
const users = require('./api/users.es6');

const app = express();

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/api/users', users.getUsers);

const server = app.listen(config.port, () => {
    const address = server.address();
    console.log(
        'Listening the http://%s:%s/',
        (address.address === '::' ? 'localhost' : address.address),
        address.port
    );
});
