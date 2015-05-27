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
        let self = this;
        $('body').on('input', '[data-currency-selector-toggle]', function(event) {
            self.emit('currencySelector-toggle', event, this);
        });
    }
}
