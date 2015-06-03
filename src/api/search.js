import _ from 'lodash';
import Base from './base';
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
        this.endPoint = '/search';
    }

    /**
     * Get search results
     * @param {String} query
     * @param {Object} options
     * @param {Function} callback
     */
    search(query, options, callback) {
        let defaultOptions = {
            params: {},
            headers: {}
        };

        options = _.assign({}, defaultOptions, options);
        options.params.search_query = encodeURIComponent(query);

        Hooks.emit('search-quick-remote', options);
        this.makeRequest(this.endPoint, 'GET', options, callback);
    }
}
