import _ from 'lodash';
import Remote from './remote';
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
        this.endpoint = '/search';
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
        this.makeRequest(this.endpoint, 'GET', options, callback);
    }
}
