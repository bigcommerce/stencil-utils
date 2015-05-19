import RemoteBC from './remote';
import _ from 'lodash';
import Utils from '../index';

export default class RemoteCountries extends RemoteBC
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

        Utils.hooks.emit('country-remote', countryId);
        this.makeRequest(url, 'GET', {}, callback);
    }

    getByName(countryName, callback) {
        let url = this.endPoint + countryName;

        Utils.hooks.emit('country-remote', countryName);
        this.makeRequest(url, 'GET', {}, callback);
    }
}
