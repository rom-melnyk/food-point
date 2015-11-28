const Ajax = require('../../utils/ajax.es6');
const dom = require('../../utils/dom.es6');
const Modal = require('../../utils/modal.es6');
const Mustache = require('mustache');
const fs = require('fs');
const gridTemplate = fs.readFileSync(__dirname + '/dishes-grid.mustache', 'utf8');
const editTemplate = fs.readFileSync(__dirname + '/edit-dish.mustache', 'utf8');

Mustache.parse(gridTemplate);
Mustache.parse(editTemplate);

const Dishes = {
    open () {
        _loadGridView().catch((obj) => {
            console.log(obj);
        });
    },

    close () {

    }
};

module.exports = Dishes;

/**
 * @return {Promise}
 * @private
 */
function _loadGridView () {
    return Ajax.get('/api/dishes')
        .then((dishes) => {
            return new Promise((resolve, reject) => {
                document.body.innerHTML = Mustache.render(gridTemplate, dishes);

                setTimeout(() => {
                    dom('.dishes .button').forEach((el) => {
                        if (dom(el).hasClass('delete')) {
                            _assignDeleteHandler(el);
                        } else if (dom(el).hasClass('edit')) {
                            _assignEditHandler(el);
                        }
                    });
                    resolve();
                }, 1);
            });
        });
}

function _assignEditHandler (el) {
    const id = el.getAttribute('data-id');
    el.addEventListener('click', (e) => {
        //console.log(`Editing "${id}"`);
        const modal = Modal.open();
        modal.container.innerHTML = `Editing "${id}"`;
    });
}

function _assignDeleteHandler (el) {
    const id = el.getAttribute('data-id');
    el.addEventListener('click', (e) => {
        console.log(`Deleting "${id}"`);
    });
}
