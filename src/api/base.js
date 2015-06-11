import $ from 'jquery';
import _ from 'lodash';
import request from '../lib/request';

export default class
{
    /**
     * @Constructor
     */
    constructor() {

    }

    /**
     *
     * @param {String} endpoint
     * @param {String} method ['GET', 'POST', 'PUT', 'DELETE']
     * @param {Object} options
     * @param {Boolean} remote
     * @param {Function} callback
     */
    makeRequest(endpoint, method, options, remote, callback) {
        let remoteUrl = endpoint;

        request(remoteUrl, {
            method: method,
            remote: remote,
            requestOptions: options
        }, callback);
    }
}
