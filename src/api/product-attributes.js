import Remote from './remote';
import $ from 'jquery';
import Hooks from '../hooks';

export default class extends Remote
{
    /**
     * @Constructor
     */
    constructor() {
        // call parent
        super();

        // set up class variables
        this.endpoint = '/product-attributes/';
    }

    /**
     *
     * @param {Object} options
     * @param {Number} productId
     * @param callback
     */
    optionChange(options, productId, callback)
    {
        let url = this.endpoint + productId,
            params = options;

        Hooks.emit('product-options-change-remote', productId);
        this.makeRequest(url, 'POST', {params: params}, callback);
    }
}
