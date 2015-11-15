const express = require('express');
const config = require('./package.json').config;

const app = express();

app.use(express.static(__dirname + '/static'));

//app.get('/', (req, res) => {
//    res.send('it works');
//});

const server = app.listen(config.port, () => {
    const address = server.address();
    console.log('Listening the http://%s:%s/', (address.address === '::' ? 'localhost' : address.address), address.port);
});
