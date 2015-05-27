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
     * @param {Object} params
     * @param {Function} callback
     */
    search(query, params, callback) {
        params.search_query = encodeURIComponent(query);

        Hooks.emit('search-quick-remote', params);
        this.makeRequest(this.endPoint, 'GET', params, callback);
    }
}
