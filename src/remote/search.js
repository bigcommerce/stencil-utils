import RemoteBC from './remote';
import _ from 'lodash';
import Utils from '../index';

export default class Search extends RemoteBC
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

        Utils.hooks.emit('search-quick', params);
        this.makeRequest(this.endPoint, 'GET', params, callback);
    }
}
