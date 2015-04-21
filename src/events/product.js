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
            }
        }
    }
}
