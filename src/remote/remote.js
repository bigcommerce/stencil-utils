import jQuery from 'jquery';

const allowable = ['GET', 'POST', 'PUT', 'DELETE'];

let internals = {};

export default class RemoteBC extends jQuery
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
     * @param {string} url
     * @param {string} method ['GET', 'POST', 'PUT', 'DELETE']
     * @param {Object} params
     * @param callback
     */
    makeRequest(url, method, params, callback) {
        let remoteUrl = this.baseEndPoint + this.getRemoteVersion() + url,
            // success
            success = (data) => {
                callback(null, data);
            },
            // error
            error = (XHR, textStatus, err) => {
                callback(err);
            };

        // Not a valid method
        if (!internals.isValidHTTPMethod(method)) {
            return callback('Not a valid HTTP method');
        }

        // make ajax request using jquery
        jQuery.ajax({
            method: method,
            url: remoteUrl,
            success: success,
            error: error
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
    return allowable.indexOf(method) !== -1;
};
