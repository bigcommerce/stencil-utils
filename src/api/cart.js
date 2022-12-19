import BodlEventsCart from '../bodl/emitters/cart';
import Base from './base';
import Hooks from '../hooks';

export default class extends Base {
    constructor(version) {
        super(version);
        this.bodlEventsCart = null;
    }

    getBodlEventsCart() {
        if (!this.bodlEventsCart) {
            this.bodlEventsCart = new BodlEventsCart();
        }
        return this.bodlEventsCart;
    }

    /**
     * Get a collection of Carts. For now, this will only return an array of a single cart as multiple carts per session
     * are not currently supported.
     *
     * @param options
     * @param {Function} callback
     */
    getCarts(options = {}, callback) {
        let url = '/api/storefront/carts';

        if (options.includeOptions) {
            url = this.includeOptions(url);
        }

        this.makeRequest(url, 'GET', options, true, (err, response) => {
            callback(err, response);
        });
    }

    /**
     * Get the current Cart's details, either with or without Product Option selections.
     * Can also be used to get a particular cart provided a cartId in the options.
     *
     * @param options
     * @param {Function} callback
     */
    getCart(options = {}, callback) {
        /* If no cart ID is provided, get the collection of carts and return the first one */
        if (!options.cartId) {
            return this.getCarts(options, (err, response) => callback(err, response[0]));
        }

        let url = `/api/storefront/carts/${options.cartId}`;

        if (options.includeOptions) {
            url = this.includeOptions(url);
        }

        this.makeRequest(url, 'GET', options, true, (err, response) => {
            callback(err, response);
        });
    }

    /**
     * Get the summary for the current primary cart. This summary does not include the full details of the cart, but
     * the response time is much faster and it's appropriate for summary use cases.
     *
     * @param options
     * @param {Function} callback
     */
    getCartSummary(options = {}, callback) {
        const url = '/api/storefront/cart-summary';

        this.makeRequest(url, 'GET', options, true, (err, response) => {
            callback(err, response);
        });
    }

    /**
     * Add the parameters to a URL needed to get product option details on cart line items
     * @param url
     */
    includeOptions(url) {
        return `${url}?include=lineItems.physicalItems.options,lineItems.digitalItems.options`;
    }

    /**
     * Get a sum of the cart line item quantities
     *
     * @param options
     * @param {Function} callback
     */
    getCartQuantity(options = {}, callback) {
        this.getCartSummary(options, (err, response) => {
            if (err) {
                return callback(err);
            }
            let quantity = 0;
            if (response
                && response.status !== 204
                && response.total_quantity) {
                quantity = response.total_quantity;
            }
            callback(null, quantity);
        });
    }

    /**
     * Enhance with Big Open Data Layer events
     *
     * @param {FormData} formData
     * @param {Function} callback
     */
    itemAdd(formData, callback) {
        this.handleItemAdd(formData, (err, response) => {
            if (!err) {
                this.getBodlEventsCart().emitAddItem(response);
            }
            callback(err, response);
        });
    }

    /**
     * Add item to cart with options (variants)
     *
     * @param {FormData} formData
     * @param {Function} callback
     */
    handleItemAdd(formData, callback) {
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

            if (qty === 0 && !err) {
                this.getBodlEventsCart().emitRemoveItem(response);
            }

            Hooks.emit('cart-item-update-remote', emitData);
            callbackArg(err, response);
        });
    }

    /**
     * Enhance with Big Open Data Layer events
     *
     * @param {String} itemId
     * @param {Function} callback
     */
    itemRemove(itemId, callback) {
        this.handleItemRemove(itemId, (err, response) => {
            if (!err) {
                this.getBodlEventsCart().emitRemoveItem(response);
            }
            callback(err, response);
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
    handleItemRemove(itemId, callback) {
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
