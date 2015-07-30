import Base from './base';
import Hooks from '../hooks';

export default class extends Base
{
    /**
     * @Constructor
     */
    constructor(version) {
        // call parent
        super(version);

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
        this.remoteRequest(url, 'GET', {}, callback);
    }

    getByName(countryName, callback) {
        let url = this.endpoint + countryName;

        Hooks.emit('country-remote', {name: countryName});
        this.remoteRequest(url, 'GET', {}, callback);
    }
}
