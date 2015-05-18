import _ from 'lodash';
import RemoteBC from './remote';
import Utils from '../index';

export default class Cart extends RemoteBC
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

        this.makeRequest('/cart/add', 'POST', payload, (err, response) => {
            let emitData = {
                item: payload,
                err: err,
                response: response
            };

            Utils.hooks.emit('cart-item-add-remote', emitData);
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

            Utils.hooks.emit('cart-item-update-remote', emitData);
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

            Utils.hooks.emit('cart-item-remove-remote', emitData);
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
        this.makeRequest('/cart/update', 'POST', payload, callback);
    }

    /**
     * Get cart content
     *
     * @param {Object} params
     * @param {Function} callback
     */
    getContent(params, callback) {
        this.makeRequest('/cart/content', 'GET', params, callback);
    }
}
