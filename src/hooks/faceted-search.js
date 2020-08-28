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
        this.on('click', '[data-faceted-search-facet]', (event) => {
            this.emit('facetedSearch-facet-clicked', event);
        });

        this.on('submit', '[data-faceted-search-range]', (event) => {
            this.emit('facetedSearch-range-submitted', event);
        });
    }
}
