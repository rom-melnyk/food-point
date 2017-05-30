import { get, post, put, del } from '../../utils/request';
import { route } from 'preact-router';
import store from '../store';
import { API, LINKS } from '../urls';

function getImages() {
    return get(API.Images)
        .then((images) => {
            store.update('images', images);
        })
        .catch(console.error);
}


function uploadImage(data) {
    return post(API.Images, data)
        .then(getImages)
        .then(() => route(LINKS.ImagesList))
        .catch(console.error);
}


function deleteImage(name) {
    return del(`${API.Images}?name=${name}`)
        .then(getImages)
        .catch(console.error);
}


export {
    getImages,
    uploadImage,
    deleteImage
};