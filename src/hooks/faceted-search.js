import BaseHooks from './base';

export default class extends BaseHooks {

    /**
     * @Constructor
     */
    constructor() {
        // call parent
        super();

        this.searchEvents();
    }

    searchEvents() {
        const facetElements = document.querySelectorAll('[data-faceted-search-facet]');

        for (let i = 0; i < facetElements.length; i++) {
            facetElements[i].addEventListener('click', event => {
                this.emit('facetedSearch-facet-clicked', event);
            });
        }

        const rangeElements = document.querySelectorAll('[data-faceted-search-range]');

        for (let i = 0; i < rangeElements.length; i++) {
            rangeElements[i].addEventListener('submit', event => {
                this.emit('facetedSearch-range-submitted', event);
            });
        }
    }
}
