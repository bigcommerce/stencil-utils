import request from '../lib/request';

import CountryApi from './countries';
import ProductApi from './product';
import ProductAttributesApi from './product-attributes';
import SearchApi from './search';
import CartApi from './cart';

const internals = {};

/**
 * Convenience function to request a page via ajax
 *
 * @param url
 * @param options
 * @param callback
 */
internals.getPage = function (url, options, callback) {
    request(url, {
        method: 'GET',
        requestOptions: options,
    }, callback);
};

export default {
    country: new CountryApi(),
    productAttributes: new ProductAttributesApi(),
    product: new ProductApi(),
    search: new SearchApi(),
    cart: new CartApi(),
    getPage: internals.getPage,
};
