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
        this.subscribe('input', '[data-currency-selector-toggle]', (event) => {
            this.emit('currencySelector-toggle', event);
        });
    }
}
