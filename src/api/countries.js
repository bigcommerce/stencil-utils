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
        this.endpoint = '/country-states/';
    }

    /**
     *
     * Get country data by id wrapper
     *
     * @param {Number} countryId
     * @param {Function} callback
     */
    getById(countryId, callback) {
        let url = this.endpoint + countryId;

        Hooks.emit('country-remote', {id: countryId});
        this.makeRequest(url, 'GET', {}, callback);
    }

    getByName(countryName, callback) {
        let url = this.endpoint + countryName;

        Hooks.emit('country-remote', {name: countryName});
        this.makeRequest(url, 'GET', {}, callback);
    }
}
