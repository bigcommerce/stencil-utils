import BaseHooks from './base';

export default class extends BaseHooks {

    /**
     * @Constructor
     */
    constructor() {
        // call parent
        super();

        this.optionsChange();
    }

    optionsChange() {
        const elements = document.querySelectorAll('[data-product-option-change]');

        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener('change', event => {
                this.emit('product-option-change', event, event.target);
            });
        }
    }
}
