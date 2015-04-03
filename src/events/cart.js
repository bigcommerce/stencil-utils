import BcEvents from './index';
import _ from 'lodash';

console.log(BcEvents);

export default class CartEvents extends BcEvents {

    /**
     *
     * @param {object} options
     */
    constructor(options){
        this.options = options || {};
        this.dataMap = {
            '[data-cart-add]': {
                eventName: 'cart-item-add',
                trigger: ['click', 'mouseover']
            },
            '[data-cart-remove]': {
                eventName: 'cart-item-remove',
                trigger: ['click']
            }
        }
    }
}
