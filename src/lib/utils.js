// Utilities
const queryString = require('query-string');

/**
 * Normalize querystring params. Remove empty array values
 * @param {string} params
 * @returns {string} Normalized querystring
 */
export function normalizeQueryStringParams(params) {
    const qsParams = queryString.parse(params, { arrayFormat: 'index' });

    const optionsCollection = Object.keys(qsParams).reduce((normalized, key) => {
        let param;

        if (qsParams[key] instanceof Array) {
            const filtered = qsParams[key].filter((item) => (item !== '' && item !== undefined));
            param = { [key]: filtered };
        } else {
            param = { [key]: qsParams[key] };
        }

        return Object.assign({}, normalized, param);
    }, {});

    const paramString = queryString.stringify(optionsCollection, { arrayFormat: 'index' });
    return paramString;
}
