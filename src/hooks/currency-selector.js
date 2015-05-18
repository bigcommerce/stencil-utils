import BaseHooks from './base';
import $ from 'jquery';

export default class CurrencySelectorHooks extends BaseHooks {

    /**
     * @Constructor
     * @param {object} options
     */
    constructor(options) {
        this.options = options || {};

        this.currencySelector();
    }

    currencySelector() {
        $('body').on('input', '[data-currency-selector-toggle]', function(event) {
            this.emit('currencySelector-toggle', event, this);
        });
    }
}
