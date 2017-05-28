/**
 * @param {String} method       one of "get", "post", "put", "delete" (case-insensitive)
 * @param {String} url
 * @param {Object} [data={}]    data to pass for "POST" or "PUT"
 */
function request(method, url, data = {}) {
    method = method.toUpperCase();

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status === 200 || xhr.status === 304) {
                const contentType = xhr.getResponseHeader('Content-Type');
                if (/application\/json/.test(contentType)) {
                    try {
                        resolve(JSON.parse(xhr.responseText));
                    } catch (e) {
                        console.error(`Response from "${url}" is unparsable as JSON`, xhr.responseText);
                        reject(null);
                    }
                } else {
                    resolve(xhr.responseText);
                }
            } else {
                reject({ status: xhr.status, response: xhr.response.text });
            }
        };

        xhr.open(method, url, true);
        if (method === "POST" || method === "PUT") {
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            let body = '{}';
            try {
                body = JSON.stringify(data);
            } catch (e) {
                console.error(`Cannot serialize provided data`, data);
            }
            xhr.send(body);
        } else {
            xhr.send();
        }
    });
}


function get(url) {
    return request('get', url);
}


function post(url, data) {
    return request('post', url, data);
}


function put(url, data) {
    return request('put', url, data);
}


function del(url) {
    return request('delete', url);
}


export {
    request,
    get,
    post,
    put,
    del
};
