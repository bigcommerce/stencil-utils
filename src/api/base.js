import $ from 'jquery';
import _ from 'lodash';

const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];

let internals = {};

export default class
{
    /**
     * @Constructor
     * @param {string} [version]
     */
    constructor(version) {
        this.remoteVersion = version || 'v1';
        this.baseEndPoint = '/remote/';
        this.endPoint = '/';
    }

    /**
     * Gets the current remote version
     *
     * @returns {string}
     */
    getRemoteVersion() {
        return this.remoteVersion;
    }

    /**
     * Set a different remote version
     *
     * @param {string} version
     */
    setRemoteVersion(version) {
        this.remoteVersion = version
    }

    /**
     *
     * @param {String} url
     * @param {String} method ['GET', 'POST', 'PUT', 'DELETE']
     * @param {Object} options
     * @param {Function} callback
     */
    makeRequest(url, method, options, callback) {
        let remoteUrl = this.baseEndPoint + this.getRemoteVersion() + url,
            // success
            success = (data) => {
                callback(null, data);
            },
            // error
            error = (XHR, textStatus, err) => {
                callback(err);
            },
            defaultOptions = {
                params: {},
                headers: {}
            };

        options = _.assign({}, defaultOptions, options);

        // Not a valid method
        if (!internals.isValidHTTPMethod(method)) {
            return callback('Not a valid HTTP method');
        }

        // make ajax request using jquery
        $.ajax({
            method: method,
            url: remoteUrl,
            success: success,
            error: error,
            data: options.params,
            headers: options.headers
        });
    }
}

/**
 * Checks whether or not the current method passed in is valid
 *
 * @param {string} method
 * @returns {boolean}
 */
internals.isValidHTTPMethod = (method) => {
    return allowedMethods.indexOf(method) !== -1;
};
