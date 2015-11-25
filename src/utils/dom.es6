/**
 * @param {String} selector
 * @returns {Array<Element>}
 */
function Dom (selector) {
    let result = [];
    if (typeof selector === 'string') {
        try {
            result = Array.prototype.slice.call(
                document.querySelectorAll(selector)
            );
        } catch (e) {
            console.error(`[ DOM ] Bad selector: "${selector}"`);
        }
    } else if (selector instanceof Element) {
        result = [selector];
    }

    result.hasClass = (className) => {
        return result.length > 0 && _hasClass.call(result[0], className);
    };

    result.addClass = (className) => {
        result.forEach((el) => {
            _addClass.call(el, className);
        }, result);
    };

    result.removeClass = (className) => {
        result.forEach((el) => {
            _removeClass.call(el, className);
        }, result);
    };

    result.toggleClass = (className) => {
        result.forEach((el) => {
            _toggleClass.call(el, className);
        }, result);
    };

    return result;
}

module.exports = Dom;

// ------------------------------ private methods ------------------------------
// all the methods use {Element} `this`
function _hasClass (className) {
    return this.classList.contains(className);
}

function _addClass (className) {
    if (!_hasClass(className)) {
        this.classList.add(className);
        return true;
    } else {
        return false;
    }
}

function _removeClass (className) {
    this.classList.remove(className);
}

function _toggleClass (className) {
    return this.classList.toggle(className);
}
