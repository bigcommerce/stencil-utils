import hooks from './hooks';
import api from './api';
import tools from './tools';

const StencilUtils = {
    hooks,
    api,
    tools,
};

export { hooks, api, tools };
export default StencilUtils;

/* global define */
(function (root) {
    if (typeof define === 'function' && define.amd && root) {
        // Ignores below for https://github.com/eslint/eslint/issues/5150
        define(function () { // eslint-disable-line prefer-arrow-callback
            root.stencilUtils = StencilUtils; // eslint-disable-line no-param-reassign
        });
    } else if (typeof module === 'object' && module.exports) {
        module.exports = StencilUtils;
    } else {
        window.stencilUtils = StencilUtils;
    }
}(this));
