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
     * @param callback
     */
    optionChange(productId, params, template = null, callback) {
        let templateArg = template;
        let callbackArg = callback;

        if (typeof templateArg === 'function') {
            callbackArg = templateArg;
            templateArg = null;
        }

        this.remoteRequest(this.endpoint + productId, 'POST', { params: parse(params), template: templateArg }, (err, response) => {
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
     * @param callback
     */
    configureInCart(itemId, params, callback) {
        this.remoteRequest(this.inCartEndpoint + itemId, 'GET', params, (err, response) => {
            callback(err, response);
        });
    }
}
