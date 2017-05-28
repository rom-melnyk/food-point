import { get, post, put, del } from '../utils/request';
import state from './state';

const URLS = {
    Dishes: '/php/api/dishes.php'
};


function toggleDishEdit(id, edit) {
    const dishes = state.state.dishes;
    const index = dishes.findIndex(({ data }) => data.id === id);
    state.update(`dishes.${index}.edit`, edit);
}


function getDishes() {
    return get(URLS.Dishes)
        .then((dishes) => {
            const dishesData = dishes.map((d) => {
                return { edit: false, data: d };
            });
            state.update('dishes', dishesData);
        })
        .catch(console.error);
}


function createDish(data) {
    return post(URLS.Dishes, data)
        .then((result) => {
            if (!result.error) {
                return getDishes();
            }
        })
        .catch(console.error);
}


function updateDish(id, data) {
    return put(`${URLS.Dishes}?id=${id}`, data)
        .then((result) => {
            if (!result.error) {
                toggleDishEdit(id, false);
                return getDishes();
            }
        })
        .catch(console.error);
}


function deleteDish(id) {
    return del(`${URLS.Dishes}?id=${id}`)
        .then((result) => {
            if (!result.error) {
                return getDishes();
            }
        })
        .catch(console.error);
}


export {
    toggleDishEdit,
    getDishes,
    createDish,
    updateDish,
    deleteDish
};
