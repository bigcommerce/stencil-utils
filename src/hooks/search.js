import BaseHooks from './base';
import $ from 'jquery';

export default class extends BaseHooks {

    /**
     * @Constructor
     */
    constructor() {
        this.quickSearch();
    }

    quickSearch() {
        let self = this;
        $('body').on('input', '[data-search-quick]', function (event) {
            self.emit('search-quick', event, this);
        });
    }
}
