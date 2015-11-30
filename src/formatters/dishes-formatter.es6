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
