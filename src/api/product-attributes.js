import Base from './base';
import Hooks from '../hooks';
import { parse } from '../lib/query-string';

export default class extends Base {
    /**
     * @Constructor
     */
    constructor(version) {
        // call parent
        super(version);

        // set up class variables
        this.endpoint = '/product-attributes/';
        this.inCartEndpoint = '/configure-options/';
    }

    /**
     * @param {Number} productId
     * @param {Object} params
     * @param {String|null} [template]
     * @param {Function} callback
     * @param {Object} [requestOptions]
     */
    optionChange(productId, params, template = null, callback, requestOptions = {}) {
        let templateArg = template;
        let callbackArg = callback;
        let requestOptionsArg = requestOptions;

        if (typeof templateArg === 'function') {
            // template was omitted — shift remaining args: callback → requestOptions
            requestOptionsArg = callbackArg || {};
            callbackArg = templateArg;
            templateArg = null;
        }

        this.remoteRequest(this.endpoint + productId, 'POST', { ...requestOptionsArg, params: parse(params), template: templateArg }, (err, response) => {
            const emitData = {
                err,
                response,
            };

            Hooks.emit('product-options-change-remote', emitData);
            callbackArg(err, response);
        });
    }

    /**
     * @param {Number} itemId
     * @param {Object} params
     * @param {Function} callback
     * @param {Object} [requestOptions]
     */
    configureInCart(itemId, params, callback, requestOptions = {}) {
        this.remoteRequest(this.inCartEndpoint + itemId, 'GET', { ...params, ...requestOptions }, (err, response) => {
            callback(err, response);
        });
    }
}
