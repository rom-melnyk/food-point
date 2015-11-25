function Dom (selector) {
    const result = Array.prototype.slice.call(
        document.querySelectorAll(selector)
    );

    result.hasClass = (className) => {
        return this.length > 0 && _hasClass.call(this[0], className);
    };

    result.addClass = (className) => {
        this.forEach((el) => {
            _addClass.call(el, className);
        });
    };

    result.removeClass = (className) => {
        this.forEach((el) => {
            _removeClass.call(el, className);
        });
    };

    result.toggleClass = (className) => {
        this.forEach((el) => {
            _toggleClass.call(el, className);
        });
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
