import Base from './base';
import $ from 'jquery';

export default class extends Base
{
    /**
     * @Constructor
     */
    constructor() {
        // call parent
        super();

        // set up class variables
        this.endpoint = '/products.php?productId=';
    }

    /**
     *
     * @param productId
     * @param params
     * @param callback
     */
    getById(productId, params, callback)
    {
        let url = this.endpoint + productId;

        if (typeof params === 'function') {
            callback = params;
            params = {};
        }

        this.makeRequest(url, 'GET', params, false, callback);
    }
}
