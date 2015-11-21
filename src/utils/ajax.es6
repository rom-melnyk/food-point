const Ajax = {};

/**
 * @param {String} url
 * @return {Promise}
 */
Ajax.get = (url) => {
    return _doRequest('GET', url);
};

module.exports = Ajax;

function _doRequest (method, url, data) {
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
        xhr.send(data);
    });
}
