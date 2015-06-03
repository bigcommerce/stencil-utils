import _ from 'lodash';
import Base from './base';
import Hooks from '../hooks';

export default class extends Base
{
    /**
     * Add item to cart with options (variants)
     *
     * @param {Number} productId
     * @param {Number} qty
     * @param {Object} options
     * @param {Function} callback
     */
    itemAdd(productId, qty, options, callback) {
        let payload = {
            product_id: productId,
            qty: qty
        };

        // add the attributes
        _.forEach(options, (val, key) => {
            payload[key] = val;
        });

        this.makeRequest('/cart/add', 'POST', {params: payload}, (err, response) => {
            let emitData = {
                item: payload,
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
     * Update cart items
     *
     * @param {Array} items
     * @param {Function} callback
     */
    update(items, callback) {
        let payload = {
            items: items
        };
        this.makeRequest('/cart/update', 'POST', {params: payload}, callback);
    }

    /**
     * Get cart content
     *
     * @param {Object} options
     * @param {Function} callback
     */
    getContent(options, callback) {
        this.makeRequest('/cart/content', 'GET', options, callback);
    }
}
