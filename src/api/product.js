import Base from './base';

export default class extends Base {
    /**
     * @Constructor
     */
    constructor(version) {
        // call parent
        super(version);

        // set up class variables
        this.endpoint = '/products.php?productId=';
    }

    /**
     *
     * @param {Number} productId
     * @param {Object} params
     * @param {Function} callback
     */
    getById(productId, params, callback) {
        const url = this.endpoint + productId;
        let paramsArg = params;
        let callbackArg = callback;

        if (typeof paramsArg === 'function') {
            callbackArg = paramsArg;
            paramsArg = {};
        }

        this.makeRequest(url, 'GET', paramsArg, false, callbackArg);
    }
}
