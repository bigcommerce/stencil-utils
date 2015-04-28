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
     * @param jQuery $container
     * @param productId
     * @param callback
     */
    optionChange($container, productId, callback)
    {
        let url = this.endPoint + productId,
            // What does this query mean?
            //
            // :input:radio:checked
            //      Get all radios that are checked (since they are grouped together by name).
            //      If the query is just :input alone, it will return all radios (even the ones that aren't selected).
            //
            // :input:not(:radio)
            //      This is to retrieve all text, hidden, dropdown fields that don't have "groups".
            $optionValues = $container.find(':input:radio:checked, :input:not(:radio)'),
            params = {};

        // iterate over values
        $optionValues.each((index, ele) => {
            let $ele = $(ele),
                name = $ele.attr('name'),
                val = $ele.val();

            params[name] = val;
        });

        this.makeRequest(url, 'POST', params, callback);
    }
}
