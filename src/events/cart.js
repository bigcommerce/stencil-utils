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
                eventTag: '[data-cart-item-add]',
                trigger: ['click']
            },
            'cart-item-remove': {
                eventTag: '[data-cart-item-remove]',
                trigger: ['click']
            },
            'cart-item-update': {
                eventTag: '[data-cart-item-update]',
                trigger: ['click']
            }
        }
    }
}
