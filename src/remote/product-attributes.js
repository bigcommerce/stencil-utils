import RemoteBC from './remote';
import $ from 'jquery';

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

        this.makeRequest(url, 'POST', params, callback);
    }
}
