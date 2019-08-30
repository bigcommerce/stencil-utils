import BaseHooks from './base';

export default class extends BaseHooks {

    /**
     * @Constructor
     */
    constructor() {
        // call parent
        super();

        this.currencySelector();
    }

    currencySelector() {
        const elements = document.querySelectorAll('[data-currency-selector-toggle]');

        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener('input', event => {
                this.emit('currencySelector-toggle', event);
            });
        }
    }
}
