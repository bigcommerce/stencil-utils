import BaseHooks from './base';
import $ from 'jquery';

export default class extends BaseHooks {

    /**
     * @Constructor
     */
    constructor() {
        // call parent
        super();

        this.sortByEvents();
    }

    sortByEvents() {
        this.$body.on('submit', '[data-sort-by]', (event) => {
            this.emit('sortBy-submitted', event);
        });

        this.$body.on('change', '[data-sort-by] select', (event) => {
            this.emit('sortBy-select-changed', event);

            if (! event.isDefaultPrevented()) {
                $(event.currentTarget).closest('form').trigger('submit');
            }
        });
    }
}
