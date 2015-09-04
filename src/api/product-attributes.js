import Base from './base';
import $ from 'jquery';
import Hooks from '../hooks';

export default class extends Base
{
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
    optionChange(productId, params, callback)
    {
        this.remoteRequest(this.endpoint + productId, 'POST', {params: params}, (err, response) => {
            let emitData = {
                err: err,
                response: response
            };

            Hooks.emit('product-options-change-remote', emitData);
            callback(err, response);
        });
    }

    /**
     * @param {Number} itemId
     * @param {Object} params
     * @param callback
     */
    configureInCart(itemId, params, callback)
    {
        this.remoteRequest(this.inCartEndpoint + itemId, 'GET', params, (err, response) => {
            callback(err, response);
        });
    }
}
