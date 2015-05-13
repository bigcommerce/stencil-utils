import BaseEvents from './base';

export default class CartEvents extends BaseEvents {

    /**
     * @Constructor
     * @param {object} options
     */
    constructor(options) {
        this.options = options || {};
        this.dataMap = {
            'cart-item-add': {
                eventTag: '[data-cart-add]'
            },
            'cart-item-remove': {
                eventTag: '[data-cart-remove]'
            },
            'cart-item-update': {
                eventTag: '[data-cart-update]'
            }
        }
    }
}
