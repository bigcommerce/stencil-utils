import request from './lib/request';

import CountryApi from './api/countries';
import ProductApi from './api/product';
import ProductAttributesApi from './api/product-attributes';
import SearchApi from './api/search';
import CartApi from './api/cart';
import CookieApi from './api/cookie';

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
    cookie: new CookieApi(),
    getPage: internals.getPage,
};
