import $ from 'jquery';
import _ from 'lodash';

const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];

let internals = {};

export default function (url, options, callback) {
    let defaultOptions = {
            method: 'GET',
            remote: false,
            requestOptions: {
                formData: null,
                params: {},
                config: {},
                template: []
            }
        },
        usingTemplates = false,
        usingSections = false,
        templates = [],
        headers;

    options = _.assign({}, defaultOptions, options);

    // Not a valid method
    if (!internals.isValidHTTPMethod(options.method)) {
        return callback(new Error('Not a valid HTTP method'));
    }

    if (_.isPlainObject(options.requestOptions.template)) {
        usingSections = true;
        templates = _.reduce(options.requestOptions.template, (acc, template) => {
            acc.push(template);

            return acc;
        }, []);
    } else if (_.isString(options.requestOptions.template)) {
        templates = [options.requestOptions.template]
    } else if (_.isArray(options.requestOptions.template) && options.requestOptions.template.length > 0) {
        templates = options.requestOptions.template;
    }

    headers = {
        'stencil-config': JSON.stringify(options.requestOptions.config)
    };

    if (templates.length > 0) {
        usingTemplates = true;

        headers['stencil-options'] = JSON.stringify({render_with: templates.join(',')})
    }

    // make ajax request using jquery
    $.ajax({
        method: options.method,
        url: url,
        contentType: options.requestOptions.formData ? false : 'application/x-www-form-urlencoded; charset=UTF-8',
        processData: options.requestOptions.formData ? false : true,
        success: (response) => {
            let ret,
                content = options.remote ? response.content : response;

            if (usingTemplates) {
                // Remove the `components` prefix from the response if it's an object
                if (_.isObject(content)) {
                    content = _.mapKeys(content, (val, key) => {
                        return key.replace(/^components\//, '');
                    });
                }

                // If using "sections", morph the content into the arbitrary keys => content object.
                if (usingSections) {
                    let flippedSections = _.invert(options.requestOptions.template);

                    content = _.mapKeys(content, (val, key) => {
                        return flippedSections[key];
                    });
                }

                if (options.remote) {
                    ret = response;
                    ret.content = content;
                } else {
                    ret = content;
                }
            } else {
                ret = response;
            }

            callback(null, ret);
        },
        error: (XHR, textStatus, err) => {
            callback(err);
        },
        data: options.requestOptions.formData ? options.requestOptions.formData : options.requestOptions.params,
        headers: headers
    });
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
