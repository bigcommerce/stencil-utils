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
        this.subscribe('submit', '[data-sort-by]', (event, target) => {
            this.emit('sortBy-submitted', event, target);
        });

        this.subscribe('change', '[data-sort-by] select', (event, target) => {
            this.emit('sortBy-select-changed', event, target);

            if (!event.defaultPrevented) {
                this.emit('sortBy-submitted', event, target);
            }
        });
    }
}
