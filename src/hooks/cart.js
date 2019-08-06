import BaseHooks from './base';

export default class extends BaseHooks {

    /**
     * @Constructor
     */
    constructor() {
        // call parent
        super();

        this.itemAdd();
    }

    itemAdd() {
        const elements = document.querySelectorAll('[data-cart-item-add]');

        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener('submit', event => {
                this.emit('cart-item-add', event, event.target);
            });
        }
    }
}
