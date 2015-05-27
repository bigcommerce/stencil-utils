import BaseHooks from './base';
import $ from 'jquery';

export default class extends BaseHooks {

    /**
     * @Constructor
     */
    constructor() {
        this.itemAdd();
    }

    itemAdd() {
        let self = this;
        $('body').on('submit', '[data-cart-item-add]', function(event) {
            self.emit('cart-item-add', event, this);
        });
    }
}
