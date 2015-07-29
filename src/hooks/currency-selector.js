import BaseHooks from './base';
import $ from 'jquery';

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
        this.$body.on('input', '[data-currency-selector-toggle]', (event) => {
            this.emit('currencySelector-toggle', event);
        });
    }
}
