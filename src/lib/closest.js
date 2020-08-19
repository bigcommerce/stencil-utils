/**
 * ie 11 does not support native closest so use this polyfill function instead to find closest matching selector starting from el.
 * @param {string} params
 * @returns {any} matching selector or null
 */
export default function closest(s) {
    let el = this;

    do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);

    return null;
}
