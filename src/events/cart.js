import BcEvents from './bc-events';
import _ from 'lodash';

export class CartEvents extends BcEvents {

    /**
     *
     * @param {object} options
     */
    constructor(options){
        this.options = options || {};
        this.dataMap = {
            '[data-cart-add]': 'cart-item-add',
            '[data-cart-remove]': 'cart-item-remove'
        }
    }
}
