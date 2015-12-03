export function parseAttribsForOneDish (dish, idx) {
    return {
        id: dish.id,
        name: dish.name,
        price: dish.price,
        attr: ((attr) => {
            try {
                return JSON.parse(attr);
            } catch (e) {
                return {
                    ordinal: idx
                };
            }
        })(dish.attr)
    };
}

export function parseAttribsForAllDishes (dishes) {
    let i = 0;
    const parsedDishes = dishes.map(dish => parseAttribsForOneDish(dish, i++));
    parsedDishes.sort((a, b) => a.attr.ordinal < b.attr.ordinal ? -1 : 1);
    return parsedDishes;
}

export function stringifyAttribsForOneDish (dish) {
    return {
        id: dish.id,
        name: dish.name,
        price: dish.price,
        attr: JSON.stringify(dish.attr)
    };
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
