const express = require('express');
const config = require('./config.json');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('./api/session.es6');
const users = require('./api/users.es6');
const dishes = require('./api/dishes.es6');

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/static'));
app.use(session.session());

app.get('/api/users', users.getUsers);

app.get('/api/dishes', dishes.getDishes);
app.get('/api/dishes/:id', dishes.getDishById);
app.post('/api/dishes', dishes.createDish);
app.put('/api/dishes/:id', dishes.updateDish);
app.delete('/api/dishes/:id', dishes.deleteDish);

app.get('/api/users', users.getUsers);
app.get('/api/users/:id', users.getUserById);
app.get('/api/me', users.getMyData);
app.put('/api/users/:id', users.updateUser);
app.delete('/api/users/:id', users.deleteUser);

app.post('/api/authenticate', users.authenticate);

const server = app.listen(config.port, () => {
    const address = server.address();
    console.info(
        'Listening the http://%s:%s/',
        (address.address === '::' ? 'localhost' : address.address),
        address.port
    );
});

// Development mode support (run with "--dev")
if (process.argv.filter(arg => /^(--)?dev$/i.test(arg)).length > 0) {
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config');

    const compiler = webpack(webpackConfig);
    compiler.watch({
        aggregateTimeout: 300/*,
         poll: true*/
    }, (error, stats) => {
        if (error) {
            console.log(`========== ERROR ==========`);
            console.log(`Something terrible happened`);
            console.log(`===========================\n`);
        }

        const logs = stats.toString({colors: true});
        console.log(logs);
    })
    ;
}
