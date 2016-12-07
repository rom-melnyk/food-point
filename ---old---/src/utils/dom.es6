/**
 * @param {String|Element} selector
 * @param {Element} [parent=document]
 * @returns {Array<Element>}
 */
function Dom (selector, parent = document) {
    let result = [];
    if (typeof selector === 'string') {
        try {
            result = Array.prototype.slice.call(
                parent.querySelectorAll(selector)
            );
        } catch (e) {
            console.error(`[ DOM ] Bad selector: "${selector}"`);
        }
    } else if (selector instanceof Element) {
        result = [selector];
    }

    result.hasClass = (className) => {
        return result.length > 0 && result[0].classList.contains(className);
    };

    result.addClass = (className) => {
        result.forEach((el) => {
            if (!el.classList.contains(className)) {
                el.classList.add(className);
            }
        });

        return result;
    };

    result.removeClass = (className) => {
        result.forEach((el) => {
            el.classList.remove(className);
        }, result);

        return result;
    };

    result.toggleClass = (className) => {
        result.forEach((el) => {
            el.classList.toggle(className);
        }, result);

        return result;
    };

    /**
     * @param {Number} [count=1] levels to climb the DOM tree
     */
    result.parent = (count) => {
        let parent = result.length > 0 ? _getParent(result[0], count) : null;

        return Dom(parent);
    };

    return result;
}

export default Dom;

// ------------------------------ private methods ------------------------------
function _getParent (el, count = 1) {
    let parent = el.parentNode;

    while (--count > 0 && parent) {
        parent = parent.parentNode;
    }

    return parent;
}
