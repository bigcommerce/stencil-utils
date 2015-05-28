import BaseHooks from './base';
import $ from 'jquery';

export default class extends BaseHooks {

    /**
     * @Constructor
     */
    constructor() {
        this.sortByEvents();
    }

    sortByEvents() {
        let $body = $('body');

        $body.on('submit', '[data-sort-by]', (event) => {
            this.emit('sortBy-submitted', event);
        });

        $body.on('change', '[data-sort-by] select', (event) => {
            this.emit('sortBy-select-changed', event);

            if (! event.isDefaultPrevented()) {
                $(event.currentTarget).closest('form').trigger('submit');
            }
        });
    }
}
