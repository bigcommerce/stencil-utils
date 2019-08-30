import BaseHooks from './base';

export default class extends BaseHooks {

    /**
     * @Constructor
     */
    constructor() {
        // call parent
        super();

        this.quickSearch();
    }

    quickSearch() {
        const elements = document.querySelectorAll('[data-search-quick]');

        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener('input', event => {
                this.emit('search-quick', event);
            });
        }
    }
}
