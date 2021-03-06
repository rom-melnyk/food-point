import _ from '../utils/_.es6';

export function parseDishes (dataFromServer, section = null, parent = null, ordinal = 0) {
    section = section || dataFromServer.find(dish => dish.name === '/');
    if (!section) {
        throw new Error('The top level section of Dishes is not found');
    }

    const parsed = _generateItem(section, parent, ordinal);
    parsed.children = [];

    let childOrdinal = 0;
    _parseChildrenString(section.children)
        .forEach((id) => {
            const dish = dataFromServer.find(d => d.id === id);

            if (!dish) {
                return;
            }

            const item = dish.children === null
                ? _generateItem(dish, parsed, childOrdinal)
                : parseDishes(dataFromServer, dish, parsed, childOrdinal);

            parsed.children.push(item);
            childOrdinal++;
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
    _dish.children = dish.children ? _stringifyChildrenInfo(dish.children) : null;
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


