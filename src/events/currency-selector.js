import BcEvents from './index';
import _ from 'lodash';

export default class CurrencySelectorEvents extends BcEvents {

    /**
     *
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
