import BaseHooks from './base';
import closest from '../lib/closest';

// ie 11 does not support native closest
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = closest;
}

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
        this.on('submit', '[data-sort-by]', (event) => {
            this.emit('sortBy-submitted', event);
        });

        this.on('change', '[data-sort-by] select', (event) => {
            this.emit('sortBy-select-changed', event);

            if (!event.isDefaultPrevented()) {
                event.currentTarget.closest('form').submit();
            }
        });
    }
}
