import 'whatwg-fetch';
import { stringify } from './query-string';
/**
 * Checks whether or not the current method passed in is valid
 *
 * @param {String} method
 * @returns {Boolean}
 */
const isValidHTTPMethod = (method) => ['GET', 'POST', 'PUT', 'DELETE'].indexOf(method) !== -1;

/**
 * Checks if requested template is using sections
 *
 * @param {Object|Array|String} requestedTemplate
 */
const isUsingSections = (requestedTemplate) => requestedTemplate !== null && typeof (requestedTemplate) === 'object' && !Array.isArray(requestedTemplate);

/**
 * Returns templates array
 *
 * @param {Object|Array|String} requestedTemplate
 * @returns {Array}
 */
const getTemplates = (requestedTemplate) => {
    let templates = [];
    if (isUsingSections(requestedTemplate)) {
        templates = Object.values(requestedTemplate);
    } else if (typeof (requestedTemplate) === 'string') {
        templates = [requestedTemplate];
    } else if (Array.isArray(requestedTemplate) && requestedTemplate.length > 0) {
        templates = requestedTemplate;
    }
    return templates;
};

export default function (relativeUrl, opts, callback) {
    const defaultOptions = {
        method: 'GET',
        remote: false,
        requestOptions: {
            baseUrl: null,
            formData: null,
            params: {},
            config: {},
            template: [],
        },
    };
    const options = { ...defaultOptions, ...opts };
    const data = options.requestOptions.formData ? options.requestOptions.formData : options.requestOptions.params;
    const headers = {
        'stencil-config': options.requestOptions.config ? JSON.stringify(options.requestOptions.config) : '{}',
        'stencil-options': '{}',
        'x-xsrf-token': window.BCData && window.BCData.csrf_token ? window.BCData.csrf_token : '',
        'x-requested-with': 'stencil-utils',
    };

    if (!isValidHTTPMethod(options.method)) {
        return callback(new Error('Not a valid HTTP method'));
    }

    const templates = getTemplates(options.requestOptions.template);
    const usingSections = isUsingSections(options.requestOptions.template);
    const usingTemplates = templates.length > 0;

    if (!options.requestOptions.formData) {
        headers['content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    }

    if (usingTemplates) {
        headers['stencil-options'] = JSON.stringify({
            render_with: templates.join(','),
        });
    }

    const config = {
        method: options.method,
        headers,
        credentials: 'include',
    };

    let url = options.requestOptions.baseUrl ? `${options.requestOptions.baseUrl}${relativeUrl}` : relativeUrl;
    if (['GET', 'HEAD'].indexOf(config.method) === -1) {
        config.body = !options.requestOptions.formData ? stringify(data, { includeArrayIndex: true }) : data;
    } else if (data) {
        const delimiter = !url.includes('?') ? '?' : '&';
        url += `${delimiter}${stringify(data)}`;
    }

    return fetch(url, config)
        .then((response) => {
            if (response.headers.get('content-type').indexOf('application/json') !== -1) {
                return response.json();
            }
            return response.text();
        })
        .then((response) => {
            const content = options.remote ? response.content : response;
            let ret = response;

            if (usingTemplates) {
                // Remove the `components` prefix from the response if it's an object
                if (typeof (content) === 'object') {
                    Object.keys(content).forEach((key) => {
                        const cleanKey = key.replace(/^components\//, '');

                        content[cleanKey] = content[key];
                        delete (content[key]);
                    });
                }

                // If using "sections", morph the content into the arbitrary keys => content object.
                if (usingSections) {
                    const requestedTemplate = options.requestOptions.template;
                    Object.keys(requestedTemplate).forEach((templateVariable) => {
                        content[templateVariable] = content[requestedTemplate[templateVariable]];
                        delete content[requestedTemplate[templateVariable]];
                    });
                }

                if (!options.remote) {
                    ret = content;
                }
            }
            callback(null, ret);
        })
        .catch((err) => callback(err));
}
