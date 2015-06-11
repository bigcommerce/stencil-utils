import $ from 'jquery';
import _ from 'lodash';
import Base from './base';
import request from '../lib/request';

export default class extends Base
{
    /**
     * @Constructor
     * @param {string} [version]
     */
    constructor(version) {
        // call parent
        super();

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

        super.makeRequest(remoteUrl, method, options, true, callback);
    }
}
