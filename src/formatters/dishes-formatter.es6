import _ from '../utils/_.es6';

export function parseDishes (dishes, section = null, parent = null, ordinal = 0) {
    section = section || dishes.find(dish => dish.name === '/');
    if (!section) {
        throw new Error('The top level section of Dishes is not found');
    }

    const parsed = _generateItem(section, parent, ordinal);
    parsed.children = [];

    const childrenIds = _parseChildrenString(section.children);

    dishes
        .filter((dish) => {
            return childrenIds.indexOf(dish.id) !== -1;
        })
        .forEach((dish, ordinal) => {
            const item = dish.children !== null
                ? parseDishes(dishes, dish, parsed)
                : _generateItem(dish, parsed, ordinal + 1);

            parsed.children.push(item);
        });

    return parsed;
}

export function stringifyDishes (dishes) {
    const result = [];

    dishes.children.forEach((dish) => {
        const _dish = stringifyDish(dish);

        if (dish.children !== null) {
            result.push( ...dish.children.map(d => stringifyDishes(d)) );
        }

        result.push(_dish);
    });

    return result;
}

export function stringifyDish (dish) {
    const _dish = _.omit(dish, ['parent', 'ordinal']);
    // null or undefined matters
    _dish.children = dish.children !== null ? _stringifyChildrenInfo(dish.children) : null;
    return _dish;
}

// -------------------------------------------
function _generateItem (dish, parent, ordinal = 0) {
    const item = _.clone(dish);
    item.parent = parent;
    item.ordinal = ordinal;

    return item;
}

function _parseChildrenString (string) {
    return string.split(',').map(v => +v);
}

function _stringifyChildrenInfo (items) {
    return items.map(dish => dish.id).join(',');
}


