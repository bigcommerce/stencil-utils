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
        this.endPoint = '/country-states/';
    }

    /**
     *
     * Get country data by id wrapper
     *
     * @param {Number} countryId
     * @param {Function} callback
     */
    getById(countryId, callback) {
        let url = this.endPoint + countryId;

        Hooks.emit('country-remote', {id: countryId});
        this.makeRequest(url, 'GET', {}, callback);
    }

    getByName(countryName, callback) {
        let url = this.endPoint + countryName;

        Hooks.emit('country-remote', {name: countryName});
        this.makeRequest(url, 'GET', {}, callback);
    }
}
