import BaseHooks from './base';
import closest from '../lib/closest';

// ie 11 does not support native closest

if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
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
        const sortByElements = document.querySelectorAll('[data-sort-by]');

        for (let i = 0; i < sortByElements.length; i++) {
            sortByElements[i].addEventListener('submit', event => {
                this.emit('sortBy-submitted', event);
            });
        }

        const selectedElements = document.querySelectorAll('[data-sort-by] select');

        for (let i = 0; i < selectedElements.length; i++) {
            selectedElements[i].addEventListener('change', event => {
                this.emit('sortBy-select-changed', event);

                if (!event.defaultPrevented) {
                    event.currentTarget.closest('form').submit();
                }
            });
        }
    }
}
