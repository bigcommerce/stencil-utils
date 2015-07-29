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
     * @param {Number} productId
     * @param {FormData} formData
     * @param callback
     */
    optionChange(productId, formData, callback)
    {
        this.makeRequest(this.endpoint + productId, 'POST', {formData: formData}, (err, response) => {
            let emitData = {
                err: err,
                response: response
            };

            Hooks.emit('product-options-change-remote', emitData);
            callback(err, response);
        });
    }
}
