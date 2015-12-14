import _ from '../utils/_.es6';

export function parseAttribsForOneDish (dish, idx) {
    const result = _.clone(dish);

    try {
        result.attr = JSON.parse(attr);
    } catch (e) {
        result.attr = {
            ordinal: idx,
            isCategory: false
        };
    }

    return result;
}

export function parseAttribsForAllDishes (dishes) {
    let i = 0;
    const parsedDishes = dishes.map(dish => parseAttribsForOneDish(dish, i++));
    parsedDishes.sort((a, b) => a.attr.ordinal < b.attr.ordinal ? -1 : 1);
    return parsedDishes;
}

export function stringifyAttribsForOneDish (dish) {
    const result = _.clone(dish);
    result.attr = JSON.stringify(dish.attr);

    return result;
}

export function stringifyAttribsForAllDishes (dishes) {
    return dishes.map(dish => stringifyAttribsForOneDish(dish));
}

// -------------------------------------------

const DishesStruc = {
    id: null,               // root
    parent: null,           // ref to the parent
    relativeIndex: -1,              // index of this element among parent's `items`
    absoluteIndex: -1,              // absolute index among all the elements
    items: [
        {},
        {}
    ]
};

/****
 H1 H1 H1 H1 H1 H1 H1
   name
   name
   name
   H2 H2 H2 H2 H2 H2 H2 H2
     name
     name
     name
   H2 H2 H2 H2 H2 H2 H2 H2
     name
     name
     name
     H3 H3 H3 H3 H3 H3 H3 H3 H3
       name
 *****/
