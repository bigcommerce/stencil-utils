import BaseEvents from './base';

export default class CartEvents extends BaseEvents {

    /**
     * @Constructor
     * @param {object} options
     */
    constructor(options) {
        this.options = options || {};
        this.dataMap = {
            '[data-cart-add]': {
                eventName: 'cart-item-add',
                trigger: ['click']
            },
            '[data-cart-remove]': {
                eventName: 'cart-item-remove',
                trigger: ['click']
            },
            '[data-cart-update]': {
                eventName: 'cart-item-update',
                trigger: ['click']
            }
        }
    }
}
