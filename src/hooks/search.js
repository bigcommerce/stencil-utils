import BaseHooks from './base';
import $ from 'jquery';

export default class SearchHooks extends BaseHooks {

    /**
     * @Constructor
     * @param {object} options
     */
    constructor(options) {
        this.options = options || {};

        this.quickSearch();

    }

    quickSearch() {
        $('body').on('input', '[data-search-quick]', (event) => {
            this.emit('search-quick', event);
        });
    }
}
