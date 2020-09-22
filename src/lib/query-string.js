/**
 * Encodes string by stricter rules
 * see https://github.com/kevva/strict-uri-encode
 *
 * @param {String} string
 */
const encode = (string) => encodeURIComponent(string).replace(/[!'()*]/g, (x) => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);

/**
 * Returns an array, where first element is the slice till separator and the second is the rest.
 *
 * @param {String} string
 * @param {String} separator
 */
const splitOnFirst = (string, separator) => {
    const separatorIndex = string.indexOf(separator);
    if (separatorIndex === -1) {
        return [string];
    }
    return [
        string.slice(0, separatorIndex),
        string.slice(separatorIndex + separator.length),
    ];
};

/**
 * Sorts array or object by keys
 *
 * @param {Array|Object} input
 */
const sortByKeys = (input) => {
    if (Array.isArray(input)) {
        return input.sort();
    }

    if (typeof input === 'object') {
        return sortByKeys(Object.keys(input))
            .sort((a, b) => Number(a) - Number(b))
            .map((key) => input[key]);
    }

    return input;
};

/**
 * Returns an array if the key exists in the object or the value if doen't
 *
 * @param {String} key
 * @param {String} value
 * @param {Object} accumulator
 */
const getParsedValue = (key, value, accumulator) => {
    if (accumulator[key] === undefined) {
        return value;
    }

    return [].concat(accumulator[key], value);
};

/**
 * Reducer that formats and combines key-value pair
 *
 * @param {String} options
 */
const reduceByKey = (options) => (key) => (result, value) => {
    if (value === undefined) {
        return result;
    }

    if (value === null) {
        return [...result, encode(key)];
    }

    if (options.includeArrayIndex) {
        if (typeof value === 'object') {
            const index = result.length / Object.keys(value).length;
            return result.concat(
                Object.keys(value).map((keyOfValue) => ([
                    encode(key),
                    '[', encode(index), ']',
                    '[', encode(keyOfValue), ']=',
                    encode(value[keyOfValue]),
                ].join(''))),
            );
        }
        const index = result.length;

        return [
            ...result,
            [encode(key), '[', encode(index), ']=', encode(value)].join(''),
        ];
    }

    return [...result, [encode(key), '=', encode(value)].join('')];
};

/**
 * Converts query string into object
 *
 * @param {String} input
 */
export function parse(input) {
    const ret = Object.create(null);

    if (typeof input !== 'string') {
        return ret;
    }

    const inputParsed = input.trim().replace(/^[?#&]/, '');

    if (!inputParsed) {
        return ret;
    }

    inputParsed.split('&').forEach((param) => {
        /* eslint-disable prefer-const */
        let [key, value] = splitOnFirst(param.replace(/\+/g, ' '), '=');

        key = decodeURIComponent(key);
        value = value === undefined ? null : decodeURIComponent(value);
        ret[key] = getParsedValue(key, value, ret);
    });

    return Object.keys(ret).sort().reduce((result, key) => {
        const value = ret[key];
        if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
            /* eslint-disable no-param-reassign */
            result[key] = sortByKeys(value);
        } else {
            /* eslint-disable no-param-reassign */
            result[key] = value;
        }

        return result;
    }, Object.create(null));
}

/**
 * Converts an object to query string
 *
 * @param {Object} object
 * @param {Object} options
 * @param {Boolean} [options.filterValues] - filters empty string or undefineds
 * @param {Boolean} [options.includeArrayIndex] - includes array index in the query string
 */
export function stringify(object, options = {
    filterValues: false,
    arrayIndex: false,
}) {
    if (!object) {
        return '';
    }

    const objectCopy = {};
    const shouldFilter = (key) => (
        options.filterValues
        && (object[key] === '' || object[key] === undefined)
    );

    Object.keys(object).forEach((key) => {
        if (!shouldFilter(key)) {
            objectCopy[key] = object[key];
        }
    });

    const keys = Object.keys(objectCopy);
    keys.sort();

    return keys.map((key) => {
        const value = object[key];

        if (value === undefined) {
            return '';
        }

        if (value === null) {
            return encode(key);
        }

        if (Array.isArray(value)) {
            return value
                .reduce(reduceByKey(options)(key), [])
                .join('&');
        }

        return `${encode(key)}=${encode(value)}`;
    }).filter((x) => x.length > 0).join('&');
}
