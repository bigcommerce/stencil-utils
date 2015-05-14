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
                eventTag: '[data-product-item-add]',
                trigger: ['click']
            },
            'product-item-remove': {
                eventTag: '[data-product-item-remove]',
                trigger: ['click']
            },
            'product-options-change': {
                eventTag: '[data-product-options-change]',
                trigger: ['change']
            },
            'product-options-change-remote': {

            },
            'product-wishlist': {
                eventTag: '[data-product-wishlist]',
                trigger: ['click']
            },
            'product-quantity-change': {
                eventTag: '[data-product-quantity-change]',
                trigger: ['click', 'change']
            },
            'product-share': {
                eventTag: '[data-product-share]',
                trigger: ['click']
            }
        }
    }
}
