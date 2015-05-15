import BaseHooks from './base';
import $ from 'jquery';

export default class CartHooks extends BaseHooks {

    /**
     * @Constructor
     * @param {object} options
     */
    constructor(options) {
        this.options = options || {};

        this.itemAdd();
    }

    itemAdd() {
        let self = this;
        $('body').on('submit', '[data-cart-item-add]', function(event) {
            self.emit('cart-item-add', event, this);
        });
    }

}
