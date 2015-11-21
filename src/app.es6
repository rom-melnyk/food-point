const Ajax = require('./utils/ajax.es6');
const Mustache = require('mustache');

let dishes,
    tplGrid, tplEdit;

Promise.all([
    Ajax.get('/components/dishes/dishes-grid.mustache'),
    Ajax.get('/api/dishes')
]).then(([template, dishesList]) => {
    tplGrid = template;
    dishes = dishesList;

    Mustache.parse(tplGrid);
    document.body.innerHTML = Mustache.render(tplGrid, dishes);
}).catch((obj) => {
    console.log(obj);
});

