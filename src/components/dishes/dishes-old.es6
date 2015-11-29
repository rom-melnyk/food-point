const Ajax = require('../../utils/ajax.es6');
const dom = require('../../utils/dom.es6');
const Modal = require('../../utils/modal.es6');
const Mustache = require('mustache');
const fs = require('fs');
const gridTemplate = fs.readFileSync(__dirname + '/dishes-grid.mustache', 'utf8');
const editTemplate = fs.readFileSync(__dirname + '/edit-dish.mustache', 'utf8');
const deleteTemplate = fs.readFileSync(__dirname + '/delete-dish.mustache', 'utf8');

Mustache.parse(gridTemplate);
Mustache.parse(editTemplate);
Mustache.parse(deleteTemplate);

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
                        const dishData = _getDishById(dishes, el.getAttribute('data-id'));
                        if (!dishData) {
                            return;
                        }

                        if (dom(el).hasClass('delete')) {
                            _assignDeleteHandler(el, dishData);
                        } else if (dom(el).hasClass('edit')) {
                            _assignEditHandler(el, dishData);
                        }
                    });

                    resolve();
                }, 1);
            });
        });
}

function _assignEditHandler (el, dishData) {
    el.addEventListener('click', (e) => {
        const modal = Modal.open();
        modal.container.innerHTML = Mustache.render(editTemplate, {});
        setTimeout(() => {
            const nameField = dom('.edit-dish [name=name]')[0];
            const priceField = dom('.edit-dish [name=price]')[0];
            nameField.value = dishData.name;
            priceField.value = dishData.price;

            dom('.edit-dish .cancel')[0].addEventListener('click', modal.close);
            dom('.edit-dish .submit')[0].addEventListener('click', () => {
                const data = {
                    name: nameField.value,
                    price: priceField.value
                };

                modal.startWaiting();
                Ajax.put(`/api/dishes/${dishData.id}`, data)
                    .then((response) => {
                        modal.stopWaiting();
                        return modal.close();
                    })
                    .then(() => {
                        _loadGridView();
                    });
            });
        }, 1);
    });
}

function _assignDeleteHandler (el, dishData) {
    el.addEventListener('click', (e) => {
        const modal = Modal.open();
        modal.container.innerHTML = Mustache.render(deleteTemplate, dishData);

        modal.startWaiting();
        Ajax.delete(`/api/dishes/${dishData.id}`)
            .then((response) => {
                modal.stopWaiting();
                return modal.close();
            })
            .then(() => {
                _loadGridView();
            });
    });
}

function _getDishById(dishes, id) {
    return dishes.filter(dish => dish.id == id)[0];
}
