import BaseHooks from './base';
import $ from 'jquery';

export default class extends BaseHooks {

    /**
     * @Constructor
     */
    constructor() {
        this.searchEvents();
    }

    searchEvents() {
        let $body = $('body');

        $body.on('click', '[data-faceted-search-facet]', (event) => {
            this.emit('facetedSearch-facet-clicked', event);
        });

        $body.on('submit', '[data-faceted-search-range]', (event) => {
            this.emit('facetedSearch-range-submitted', event);
        });
    }
}
