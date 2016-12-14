const Ajax = {
    /**
     * @param {String} url
     * @return {Promise}
     */
    get(url) {
        return _doRequest('GET', url);
    },

    /**
     * @param {String} url
     * @return {Promise}
     */
    delete(url) {
        return _doRequest('DELETE', url);
    },

    /**
     * @param {String} url
     * @param {Object} [data]
     * @return {Promise}
     */
    post(url, data) {
        return _doRequest('POST', url, data);
    },

    /**
     * @param {String} url
     * @param {Object} [data]
     * @return {Promise}
     */
    put(url, data) {
        return _doRequest('PUT', url, data);
    }

};


module.exports = Ajax;


const CONTENT_TYPE_REGEXP = /application\/json/;


function _doRequest (method, url, data) {
    return new Promise((resolve, reject) => {
        const { header, body } = _generateRequestParams(method, data);
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status === 200 || xhr.status === 304) {
                const contentType = xhr.getResponseHeader('Content-Type');
                let response;
                if (CONTENT_TYPE_REGEXP.test(contentType)) {
                    try {
                        response = JSON.parse(xhr.responseText);
                    } catch (e) {
                        response = null;
                    }
                    resolve(response);
                } else {
                    resolve(xhr.responseText);
                }
            } else {
                reject({status: xhr.status, response: xhr.response.text});
            }
        };

        xhr.open(method, url, true);
        if (body && header) {
            xhr.setRequestHeader('Content-Type', header);
        }
        xhr.send(body);
    });
}


function _generateRequestParams(method, data) {
    let header = null;
    let body = null;

    if ((method !== 'POST' && method !== 'PUT') || typeof data === 'undefined') {
        return { header, body };
    }

    if (data.constructor === File) {
        // header is handled automatically
        body = new FormData();
        body.append('file', data); // the name of "multiform" HTTP request field; this expected by server#multer

        return { header, body };
    }

    header = 'application/json';

    try {
        body = JSON.stringify(data);
    } catch (e) {
        console.warn(`${method} ${url}: cannot serialize data %j`, data);
        body = '{}';
    }

    return { header, body };
}
