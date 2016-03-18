import Base from './base';
import Hooks from '../hooks';

export default class extends Base {
    /**
     * Add item to cart with options (variants)
     *
     * @param {FormData} formData
     * @param {Function} callback
     */
    itemAdd(formData, callback) {
        this.remoteRequest('/cart/add', 'POST', { formData }, (err, response) => {
            const emitData = {
                err,
                response,
            };

            Hooks.emit('cart-item-add-remote', emitData);
            callback(err, response);
        });
    }

    /**
     * Update cart item quantity
     *
     * @param {String|Object} itemId
     * @param {Number|Function} qty
     * @param {Function|null} callback
     */
    itemUpdate(itemId, qty, callback) {
        let callbackArg = callback;
        let items;

        if (Array.isArray(itemId) && typeof qty === 'function') {
            callbackArg = qty;
            items = itemId;
        } else {
            items = [
                {
                    id: itemId,
                    quantity: qty,
                },
            ];
        }

        this.update(items, (err, response) => {
            const emitData = {
                items,
                err,
                response,
            };

            Hooks.emit('cart-item-update-remote', emitData);
            callbackArg(err, response);
        });
    }

    /**
     * Remove cart items
     *
     * Calls the internal update function with quantity: 0
     *
     * @param {String} itemId
     * @param {Function} callback
     */
    itemRemove(itemId, callback) {
        const items = [
            {
                id: itemId,
                quantity: 0,
            },
        ];

        this.update(items, (err, response) => {
            const emitData = {
                items,
                err,
                response,
            };

            Hooks.emit('cart-item-remove-remote', emitData);
            callback(err, response);
        });
    }

    /**
     * Get giftwrapping options
     * @param {String} itemId
     * @param {Object|Function} options
     * @param {Function|null} callback
     */
    getItemGiftWrappingOptions(itemId, options, callback) {
        let opts = options || {};
        let callbackArg = callback;

        if (typeof opts === 'function') {
            callbackArg = opts;
            opts = {};
        }

        this.remoteRequest(`/gift-wrapping/${itemId}`, 'GET', opts, callbackArg);
    }

    /**
     * Submit giftwrapping options
     *
     * @param {String} itemId
     * @param {Function} callback
     */
    submitItemGiftWrappingOption(itemId, params, callback) {
        this.remoteRequest(`/gift-wrapping/${itemId}`, 'POST', { params }, callback);
    }

    /**
     * Update cart items
     *
     * @param {Array} items
     * @param {Function} callback
     */
    update(items, callback) {
        const payload = {
            items,
        };

        this.remoteRequest('/cart/update', 'POST', { params: payload }, callback);
    }

    /**
     * Get cart content
     *
     * @param {Object} options
     * @param {Function} callback
     */
    getContent(options, callback) {
        let opts = options || {};
        let callbackArg = callback;

        if (typeof opts === 'function') {
            callbackArg = opts;
            opts = {};
        }

        this.makeRequest('/cart.php', 'GET', opts, false, callbackArg);
    }

    /**
     * Get cart shipping quote
     *
     * @param {Object} params
     * @param {String|Array|Object} renderWith
     * @param {Function} callback
     */
    getShippingQuotes(params, renderWith, callback) {
        const options = {
            params,
        };
        let callbackArg = callback;
        let renderWithArg = renderWith;

        if (typeof callbackArg !== 'function') {
            callbackArg = renderWithArg;
            renderWithArg = null;
        }

        if (renderWithArg) {
            options.template = renderWithArg;
        }

        this.remoteRequest('/shipping-quote', 'GET', options, callbackArg);
    }

    /**
     * Submit shipping quote based on quoteId
     *
     * @param {Number} quoteId
     * @param {Function} callback
     */
    submitShippingQuote(quoteId, callback) {
        const options = {
            params: {
                shipping_method: quoteId,
            },
        };

        this.remoteRequest('/shipping-quote', 'POST', options, callback);
    }

    /**
     * Apply a coupon code or gift certificate to the cart
     *
     * @param {String} code
     * @param {Function} callback
     */
    applyCode(code, callback) {
        const options = {
            params: {
                code,
            },
        };

        this.remoteRequest('/apply-code', 'POST', options, callback);
    }

    /**
     * Apply a coupon code or gift certificate to the cart
     *
     * @param {Number} code
     * @param {Function} callback
     */
    applyGiftCertificate(code, callback) {
        const options = {
            params: {
                code,
            },
        };

        this.remoteRequest('/gift-certificates', 'POST', options, callback);
    }
}
