import BaseHooks from './base';
import $ from 'jquery';

export default class extends BaseHooks {

    /**
     * @Constructor
     */
    constructor() {
        this.currencySelector();
    }

    currencySelector() {
        $('body').on('input', '[data-currency-selector-toggle]', (event) => {
            this.emit('currencySelector-toggle', event);
        });
    }
}
