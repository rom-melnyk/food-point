const Ajax = {};

/**
 * @param {String} url
 * @return {Promise}
 */
Ajax.get = (url) => {
    return _doRequest('GET', url);
};

/**
 * @param {String} url
 * @return {Promise}
 */
Ajax.delete = (url) => {
    return _doRequest('DELETE', url);
};

/**
 * @param {String} url
 * @param {Object} [data]
 * @return {Promise}
 */
Ajax.post = (url, data) => {
    return _doRequest('POST', url, data);
};

/**
 * @param {String} url
 * @param {Object} [data]
 * @return {Promise}
 */
Ajax.put = (url, data) => {
    return _doRequest('PUT', url, data);
};

export default Ajax;

function _doRequest (method, url, data) {
    let reqBody = null;
    if ((method === 'POST' || method === 'PUT') && typeof data !== 'undefined') {
        try {
            reqBody = JSON.stringify(data);
        } catch (e) {
            reqBody = '{}';
        }
    }

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status === 200 || xhr.status === 304) {
                const contentType = xhr.getResponseHeader('Content-Type');
                let response;
                if (/application\/json/.test(contentType)) {
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
        if (reqBody) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }
        xhr.send(reqBody);
    });
}
