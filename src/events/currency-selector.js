import BaseEvents from './base';

export default class CurrencySelectorEvents extends BaseEvents {

    /**
     * @Constructor
     * @param {object} options
     */
    constructor(options) {
        this.options = options || {};

        this.dataMap = {
            'currencySelector-toggle': {
                eventTag: '[data-currency-selector-toggle]'
            }
        };
    }
}
