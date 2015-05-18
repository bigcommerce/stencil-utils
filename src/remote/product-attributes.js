import RemoteBC from './remote';
import $ from 'jquery';
import Utils from '../index';

export default class RemoteProductAttributes extends RemoteBC
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

        Utils.hooks.emit('product-options-change-remote', productId);
        this.makeRequest(url, 'POST', params, callback);
    }
}
