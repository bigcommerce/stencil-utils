import BcEvents from './index';
import _ from 'lodash';

export  default class ProductEvents extends BcEvents {

    /**
     *
     * @param {object} options
     */
    constructor(options){
        this.options = options || {};
        this.dataMap = {
            '[data-product-add]': 'product-item-add',
            '[data-product-remove]': 'product-item-remove'
        }
    }
}
