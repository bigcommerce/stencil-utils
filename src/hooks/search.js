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
        let self = this;
        $('body').on('input', '[data-quick-search]', function(event) {
            self.emit('quick-search', event, this);
        });
    }
}
