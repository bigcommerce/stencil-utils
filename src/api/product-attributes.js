import Base from './base';
import $ from 'jquery';
import Hooks from '../hooks';

export default class extends Base
{
    /**
     * @Constructor
     */
    constructor() {
        // call parent
        super();

        // set up class variables
        this.endPoint = '/product-attributes/';
    }

    /**
     *
     * @param {Object} options
     * @param {Number} productId
     * @param callback
     */
    optionChange(options, productId, callback)
    {
        let url = this.endPoint + productId,
            params = options;

        Hooks.emit('product-options-change-remote', productId);
        this.makeRequest(url, 'POST', params, callback);
    }
}
