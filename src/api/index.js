import request from '../lib/request';

import CountryApi from './countries';
import ProductApi from './product';
import ProductAttributesApi from './product-attributes';
import SearchApi from './search';
import CartApi from './cart';
import Wishlist from './wishlist';

import BodlCartHandler from '../bodl/handlers/cart';

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

const cart = new CartApi();
// eslint-disable-next-line no-new
new BodlCartHandler(cart);

export default {
    country: new CountryApi(),
    productAttributes: new ProductAttributesApi(),
    product: new ProductApi(),
    search: new SearchApi(),
    cart,
    wishlist: new Wishlist(),
    getPage: internals.getPage,
};
