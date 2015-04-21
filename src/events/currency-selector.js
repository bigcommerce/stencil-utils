import BaseEvents from './base';

export default class CurrencySelectorEvents extends BaseEvents {

    /**
     * @Constructor
     * @param {object} options
     */
    constructor(options) {
        this.options = options || {};

        this.dataMap = {
            '[data-currency-selector-toggle]': {
                eventName: 'currency-selector-toggle',
                trigger: ['click']
            }
        };
    }
}
