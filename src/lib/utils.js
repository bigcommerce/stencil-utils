// Utilities
const queryString = require('query-string');

/**
 * Normalize querystring params. Remove empty array values
 * @param {string} params
 * @returns {string} Normalized querystring
 */
export function normalizeQueryStringParams(params) {
    const qsParams = queryString.parse(params);

    const isValidParam = (value) => (value !== '' && value !== undefined);

    const optionsCollection = Object.keys(qsParams).reduce((normalized, key) => {
        let param;

        if (qsParams[key] instanceof Array) {
            const filtered = qsParams[key].filter(isValidParam);
            param = { [key]: filtered };
        } else if (isValidParam(qsParams[key])) {
            param = { [key]: qsParams[key] };
        }

        return Object.assign({}, normalized, param);
    }, {});

    const paramString = queryString.stringify(optionsCollection);
    return paramString;
}
