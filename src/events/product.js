import BaseEvents from './base';

export default class ProductEvents extends BaseEvents {

    /**
     * @Constructor
     * @param {object} options
     */
    constructor(options) {
        this.options = options || {};

        this.dataMap = {
            'product-item-add': {
                eventTag: '[data-product-add]'
            },
            'product-item-remove': {
                eventTag: '[data-product-remove]'
            },
            'product-options-change': {
                eventTag: '[data-product-options-change]'
            },
            'product-wishlist': {
                eventTag: '[data-product-wishlist]'
            },
            'product-quantity-change': {
                eventTag: '[data-product-quantity-change]'
            },
            'product-share': {
                eventTag: '[data-product-share]'
            }
        }
    }
}
