import $ from 'jquery';

/**
 * Checks whether or not the current method passed in is valid
 *
 * @param {string} method
 * @returns {boolean}
 */
function isValidHTTPMethod(method) {
    const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];

    return allowedMethods.indexOf(method) !== -1;
}


export default function (url, opts, callback) {
    const defaultOptions = {
        method: 'GET',
        remote: false,
        requestOptions: {
            formData: null,
            params: {},
            config: {},
            template: [],
        },
    };
    const options = Object.assign({}, defaultOptions, opts);
    const data = options.requestOptions.formData ? options.requestOptions.formData : options.requestOptions.params;
    const headers = {
        'stencil-config': options.requestOptions.config ? JSON.stringify(options.requestOptions.config) : '{}',
        'stencil-options': '{}',
    };
    const requestedTemplate = options.requestOptions.template;

    let usingTemplates = false;
    let usingSections = false;
    let templates = [];


    // Not a valid method
    if (!isValidHTTPMethod(options.method)) {
        return callback(new Error('Not a valid HTTP method'));
    }


    if (typeof(requestedTemplate) === 'object' && !Array.isArray(requestedTemplate)) {
        let template;

        usingSections = true;
        templates = [];

        for (template in requestedTemplate) {
            if (requestedTemplate.hasOwnProperty(template)) {
                templates.push(requestedTemplate[template]);
            }
        }
    } else if (typeof(requestedTemplate) === 'string') {
        templates = [requestedTemplate];
    } else if (Array.isArray(requestedTemplate) && requestedTemplate.length > 0) {
        templates = requestedTemplate;
    }

    if (templates.length > 0) {
        usingTemplates = true;

        headers['stencil-options'] = JSON.stringify({
            render_with: templates.join(','),
        });
    }

    // make ajax request using jquery
    $.ajax({
        method: options.method,
        url,
        contentType: options.requestOptions.formData ? false : 'application/x-www-form-urlencoded; charset=UTF-8',
        processData: !options.requestOptions.formData,
        success: (response) => {
            let ret;
            const content = options.remote ? response.content : response;

            if (usingTemplates) {
                // Remove the `components` prefix from the response if it's an object
                if (typeof(content) === 'object') {
                    const keys = Object.keys(content);
                    let key;

                    for (key of keys) {
                        const cleanKey = key.replace(/^components\//, '');

                        content[cleanKey] = content[key];
                        delete(content[key]);
                    }
                }

                // If using "sections", morph the content into the arbitrary keys => content object.
                if (usingSections) {
                    const templateVariableNames = Object.keys(requestedTemplate);
                    let templateVariable;
                    for (templateVariable of templateVariableNames) {
                        content[templateVariable] = content[requestedTemplate[templateVariable]];
                        delete content[requestedTemplate[templateVariable]];
                    }
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
        data,
        headers,
    });
}
