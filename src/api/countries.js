import Base from './base';

export default class extends Base {
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
     * @param {Number} id
     * @param {Function} callback
     */
    getById(id, callback) {
        const url = this.endpoint + id;

        this.remoteRequest(url, 'GET', {}, callback);
    }

    /**
     * Get country data by country name
     * @param name
     * @param callback
     */
    getByName(name, callback) {
        const url = this.endpoint + name;

        this.remoteRequest(url, 'GET', {}, callback);
    }
}
