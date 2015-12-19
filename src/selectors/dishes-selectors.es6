import { getState } from '../state.es6';

export function getItemById (id) {
    const dishes = getState().dishes;
    return _pickOneItem(dishes, dish => dish.id === id);
}

export function getAllSections () {
    const dishes = getState().dishes;
    return _pickAllItems(dishes, dish => !!dish.children);
}

export function getRoot () {
    return getState().dishes;
}

// -------------------------- private methods --------------------------
function _pickOneItem (item, predicate) {
    let result = predicate(item);

    if (result) {
        return item;
    }

    if (item.children) {
        item.children.some((child) => {
            result = _pickOneItem(child, predicate);
            return result;
        });
    }

    return result ? result : null;
}

function _pickAllItems (item, predicate) {
    let result = [];

    if (predicate(item)) {
        result.push(item);
    }

    if (item.children) {
        item.children.forEach((child) => {
            result.push(..._pickAllItems(child, predicate));
        });
    }

    return result;
}
