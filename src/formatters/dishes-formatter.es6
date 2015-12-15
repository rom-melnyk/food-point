import _ from '../utils/_.es6';

export function parseDishes (dishes, section = null, parent = null) {
    section = section || dishes.find(dish => dish.name === '/');
    if (!section) {
        throw new Error('The top level section of Dishes is not found');
    }

    const parsed = _generateItem(section, parent);
    parsed.children = [];

    _parseChildrenString(parent.children)
        .map(id => dishes.filter(dish => dish.id === id))
        .forEach((dish) => {
            const item = dish.children !== null
                ? parseDishes(dishes, dish, parsed)
                : _generateItem(dish, parsed);

            parsed.children.push(item);
        });

    return parsed;
}

export function stringifyDishes (dishes) {
    const result = [];

    dishes.children.forEach((dish) => {
        const _dish = stringifyDish(dish);

        if (dish.children != null) {
            result.push( ...dish.children.map(d => stringifyDishes(d)) );
        }

        result.push(_dish);
    });

    return result;
}

export function stringifyDish (dish) {
    const _dish = _.omit(dish, ['parent']);
    // null or undefined matters
    _dish.children = dish.children != null ? _stringifyChildrenInfo(dish.children) : null;
    return _dish;
}

// -------------------------------------------
function _generateItem (dish, parent) {
    const item = _.omit(dish, ['children']);
    item.parent = parent;

    return item;
}

function _parseChildrenString (string) {
    return string.split(',').map(v => +v);
}

function _stringifyChildrenInfo (items) {
    return items.map(dish => dish.id).join(',');
}


