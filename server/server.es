const config = require('./config.json');

const path = require('path');
const express = require('express');
const exphbs  = require('express-handlebars');
const multer = require('multer');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// --- API part ---
// const session = require('./express-api/session.es6');
// const users = require('./express-api/users.es6');
// const dishes = require('./express-api/dishes.es6');
const labelsApi = require('./express-api/labels.es');
const picturesApi = require('./express-api/pictures.es');
// --- semi-static views ---
const labelsView = require('./express-views/labels.es');
const picturesView = require('./express-views/pictures.es');

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
app.get('/pictures', picturesView.picturesPage);

const staticDir = path.join(__dirname, '..', 'static');
app.use(express.static(staticDir));

// app.use(session.session());

// --- API ---
app.post('/api/labels', labelsApi.addLabel);
app.get('/api/labels', labelsApi.getLabels);
app.get('/api/labels/:id', labelsApi.getLabel);
app.put('/api/labels/:id', labelsApi.editLabel);
app.delete('/api/labels/:id', labelsApi.removeLabel);

const uploadDir = path.join(__dirname, '..', config.uploadDir);
const uploader = multer({ dest: uploadDir }).single('picture');
// "picture" is the name of the field in the form
app.post('/api/pictures', uploader, picturesApi.uploadPicture);
app.get('/api/pictures', picturesApi.getPictures);

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
