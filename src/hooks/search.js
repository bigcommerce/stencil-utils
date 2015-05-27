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
        $('body').on('input', '[data-search-quick]', (event) => {
            this.emit('search-quick', event);
        });
    }
}
