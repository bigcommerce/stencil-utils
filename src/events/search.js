import BaseEvents from './base';

export default class SearchEvents extends BaseEvents {

    /**
     * @Constructor
     * @param {object} options
     */
    constructor(options) {
        this.options = options || {};

        this.dataMap = {
            '[data-quick-search]': {
                eventName: 'search-quick',
                trigger: ['input']
            }
        };
    }
}
