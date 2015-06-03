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

        this.endPoint = '/product/';
    }

    /**
     *
     * @param productId
     * @param params
     * @param callback
     */
    getById(productId, params, callback)
    {
        let url = this.endPoint + productId;

        if (typeof params === 'function') {
            callback = params;
            params = {};
        }

        this.makeRequest(url, 'GET', {params: params}, callback);
    }
}
