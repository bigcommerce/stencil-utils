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
        this.subscribe('click', '[data-faceted-search-facet]', (event, target) => {
            this.emit('facetedSearch-facet-clicked', event, target);
        });

        this.subscribe('submit', '[data-faceted-search-range]', (event, target) => {
            this.emit('facetedSearch-range-submitted', event, target);
        });
    }
}
