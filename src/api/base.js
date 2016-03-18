import request from '../lib/request';

export default class
{
    /**
     * @Constructor
     */
    constructor(version) {
        this.remoteVersion = version || 'v1';
        this.remoteBaseEndpoint = '/remote/';
    }

    /**
     *
     * @param {String} url
     * @param {String} method ['GET', 'POST', 'PUT', 'DELETE']
     * @param {Object} options
     * @param {Boolean} remote
     * @param {Function} callback
     */
    makeRequest(url, method, options, remote, callback) {
        request(url, {
            method,
            remote,
            requestOptions: options,
        }, callback);
    }

    /**
     *
     * @param {String} endpoint
     * @param {String} method ['GET', 'POST', 'PUT', 'DELETE']
     * @param {Object} options
     * @param {Function} callback
     */
    remoteRequest(endpoint, method, options, callback) {
        const remoteUrl = this.remoteBaseEndpoint + this.remoteVersion + endpoint;

        this.makeRequest(remoteUrl, method, options, true, callback);
    }
}
