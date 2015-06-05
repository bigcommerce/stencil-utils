import $ from 'jquery';
import _ from 'lodash';
import request from '../lib/request';

export default class
{
    /**
     * @Constructor
     * @param {string} [version]
     */
    constructor(version) {
        this.remoteVersion = version || 'v1';
        this.baseEndpoint = '/remote/';
    }

    /**
     *
     * @param {String} endpoint
     * @param {String} method ['GET', 'POST', 'PUT', 'DELETE']
     * @param {Object} options
     * @param {Function} callback
     */
    makeRequest(endpoint, method, options, callback) {
        let remoteUrl = this.baseEndpoint + this.remoteVersion + endpoint;

        request(remoteUrl, {
            method: method,
            remote: true,
            requestOptions: options
        }, callback);
    }
}
