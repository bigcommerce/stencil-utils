import _ from 'lodash';
import Base from './base';
import Hooks from '../hooks';

export default class extends Base
{
    /**
     * Add item to cart with options (variants)
     *
     * @param {FormData} formData
     * @param {Function} callback
     */
    itemAdd(formData, callback) {

        this.remoteRequest('/cart/add', 'POST', {formData: formData}, (err, response) => {
            let emitData = {
                err: err,
                response: response
            };

            Hooks.emit('cart-item-add-remote', emitData);
            callback(err, response);
        });
    }

    /**
     * Update cart item quantity
     *
     * @param {String} itemId
     * @param {Number} qty
     * @param {Function} callback
     */
    itemUpdate(itemId, qty, callback) {
        let items = [
            {id: itemId, quantity: qty}
        ];

        this.update(items, (err, response) => {
            let emitData = {
                items: items,
                err: err,
                response: response
            };

            Hooks.emit('cart-item-update-remote', emitData);
            callback(err, response);
        });
    }

    /**
     * Remove cart items
     *
     * @param {String} itemId
     * @param {Function} callback
     */
    itemRemove(itemId, callback) {
        let items = [
            {id: itemId, quantity: 0}
        ];

        this.update(items, (err, response) => {
            let emitData = {
                items: items,
                err: err,
                response: response
            };

            Hooks.emit('cart-item-remove-remote', emitData);
            callback(err, response);
        });
    }

    /**
     * Remove cart items
     *
     * @param {String} itemId
     * @param {Function} callback
     */
    getItemGiftWrappingOptions(itemId, options, callback) {
        options = options || {};

        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        this.remoteRequest('/gift-wrapping/' + itemId, 'GET', options, callback);
    }

    /**
     * Remove cart items
     *
     * @param {String} itemId
     * @param {Function} callback
     */
    submitItemGiftWrappingOption(itemId, params, callback) {
        this.remoteRequest('/gift-wrapping/' + itemId, 'POST', {params: params}, callback);
    }

    /**
     * Update cart items
     *
     * @param {Array} items
     * @param {Function} callback
     */
    update(items, callback) {
        let payload = {
            items: items
        };
        this.remoteRequest('/cart/update', 'POST', {params: payload}, callback);
    }

    /**
     * Get cart content
     *
     * @param {Object} options
     * @param {Function} callback
     */
    getContent(options, callback) {
        options = options || {};

        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        this.makeRequest('/cart.php', 'GET', options, false, callback);
    }

    /**
     * Get cart shipping quote
     *
     * @param {Object} params
     * @param {String|Array|Object} renderWith
     * @param {Function} callback
     */
    getShippingQuotes(params, renderWith, callback) {
        let options = {
            params: params
        };

        if (typeof callback !== 'function') {
            callback = renderWith;
            renderWith = null;
        }

        if (renderWith) {
            options.template = renderWith;
        }

        this.remoteRequest('/shipping-quote', 'GET', options, callback);
    }

    /**
     * Update cart items
     *
     * @param {Number} quoteId
     * @param {Function} callback
     */
    submitShippingQuote(quoteId, callback) {
        let options = {
            params: {
                shipping_method: quoteId
            }
        };

        this.remoteRequest('/shipping-quote', 'POST', options, callback);
    }

    /**
     * Apply a coupon code or gift certificate to the cart
     *
     * @param {Number} quoteId
     * @param {Function} callback
     */
    applyCode(code, callback) {
        let options = {
            params: {
                code: code
            }
        };

        this.remoteRequest('/apply-code', 'POST', options, callback);
    }
}
