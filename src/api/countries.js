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
        const url = this.endpoint + countryId;

        Hooks.emit('country-remote', {id: countryId});
        this.remoteRequest(url, 'GET', {}, callback);
    }

    /**
     * Get country data by country name
     * @param countryName
     * @param callback
     */
    getByName(countryName, callback) {
        const url = this.endpoint + countryName;

        Hooks.emit('country-remote', {name: countryName});
        this.remoteRequest(url, 'GET', {}, callback);
    }
}
