import BaseEvents from './base';

export default class ProductEvents extends BaseEvents {

    /**
     * @Constructor
     * @param {object} options
     */
    constructor(options) {
        this.options = options || {};
        this.dataMap = {
            '[data-product-add]': {
                eventName: 'product-item-add',
                trigger: ['click']
            },
            '[data-product-remove]': {
                eventName: 'product-item-remove',
                trigger: ['click']
            },
            '[data-product-options-change]': {
                eventName: 'product-options-change',
                trigger: ['click', 'change']
            },
            '[data-product-wishlist]': {
                eventName: 'product-wishlist',
                trigger: ['click']
            },
            '[data-product-quantity-change]': {
                eventName: 'product-quantity-change',
                trigger: ['click', 'change']
            },
            '[data-product-share]': {
                eventName: 'product-share',
                trigger: ['click']
            }
        }
    }
}
