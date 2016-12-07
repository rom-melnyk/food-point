const config = require('./config.json');

const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// --- API part ---
// const session = require('./express-api/session.es6');
// const users = require('./express-api/users.es6');
// const dishes = require('./express-api/dishes.es6');
const labelsApi = require('./express-api/labels.es');
// --- semi-static views ---
const labelsView = require('./express-views/labels.es');

const templatesDir = 'server/templates/';
const hbsConfig = {
    defaultLayout: 'main',
    extname: 'hbs',
    layoutsDir: `${templatesDir}layouts`,
    partialsDir: `${templatesDir}partials`,
};

const app = express();

app.set('views', templatesDir);
app.set('view engine', 'hbs');
app.engine('hbs', exphbs(hbsConfig));

app.use(cookieParser());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// --- semi-static views ---
app.get('/labels', labelsView.labelsPage);

app.use(express.static(`${__dirname}/../static`));

// app.use(session.session());

// --- API ---
app.post('/api/labels', labelsApi.addLabel);
app.get('/api/labels', labelsApi.getLabels);
app.get('/api/labels/:id', labelsApi.getLabel);
app.put('/api/labels/:id', labelsApi.editLabel);
app.delete('/api/labels/:id', labelsApi.removeLabel);

// app.get('/api/dishes', dishes.getDishes);
// app.get('/api/dishes/:id', dishes.getDishById);
// app.post('/api/dishes', dishes.createDish);
// app.put('/api/dishes/:id', dishes.updateDish);
// app.delete('/api/dishes/:id', dishes.deleteDish);

const server = app.listen(config.port, () => {
    const address = server.address();
    console.info(
        'Listening the http://%s:%s/',
        (address.address === '::' ? 'localhost' : address.address),
        address.port
    );
});
