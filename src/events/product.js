import BcEvents from './index';
import _ from 'lodash';

export  default class ProductEvents extends BcEvents {

    /**
     *
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
