import { get, post, put, del } from '../../utils/request';
import store from '../store';
import { API, LINKS } from '../urls';


function getDishesStructure() {
    return Promise.all([ get(API.DishesStructure), get(API.Dishes), get(API.Groups) ])
        .then(([structure, dishes, groups ]) => {
            store.update('dishes-structure', structure);
            // const { dishes, groups } = getPlainGroupsAndDishes(structure);
            store.update('dishes', dishes);
            store.update('groups', groups);
        })
        .catch(console.error);
}


export { getDishesStructure };


// ------------------------- helpers -------------------------
/**
const GROUP_FIELDS = [ 'id', 'name', 'description', 'image' ];
const DISH_FIELDS = [ 'id', 'name', 'description', 'image', 'size', 'price', 'props' ];


function getPlainGroupsAndDishes(structure, parent = null) {
    const result = {
        dishes: [],
        groups: []
    };

    const thisGroup = createDataItem(GROUP_FIELDS, structure, parent);
    result.groups.push(thisGroup);
    structure.items.forEach((ch) => {
        if (ch.items) {
            const { dishes, groups } = getPlainGroupsAndDishes(ch, thisGroup);
            result.groups.push(...groups);
            result.dishes.push(...dishes);
        } else {
            result.dishes.push( createDataItem(DISH_FIELDS, ch, thisGroup) );
        }
    });

    return result;
}


function createDataItem(fieldset, data, parent) {
    const group = fieldset.reduce((res, field) => {
        res[field] = data[field];
        return res;
    }, {});

    group.parent = parent;
    return group;
}
**/
