const dev = require('./dev.es6');

const express = require('express');
const config = require('./package.json').config;
const bodyParser = require('body-parser');
const users = require('./api/users.es6');
const dishes = require('./api/dishes.es6');

const app = express();

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/api/users', users.getUsers);

app.get('/api/dishes', dishes.getDishes);
app.get('/api/dishes/:id', dishes.getDishById);
app.post('/api/dishes', dishes.createDish);
app.put('/api/dishes/:id', dishes.updateDish);
app.delete('/api/dishes/:id', dishes.deleteDish);

if (process.argv.filter(v => /^(--)?dev$/i.test(v)).length > 0) {
    console.info('DEV mode ON; watching *.es6 and *.scss\n');
    dev.start();
    dev.force();
}

const server = app.listen(config.port, () => {
    const address = server.address();
    console.info(
        'Listening the http://%s:%s/',
        (address.address === '::' ? 'localhost' : address.address),
        address.port
    );
});
