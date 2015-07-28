import BaseHooks from './base';

export default class extends BaseHooks {

    /**
     * @Constructor
     */
    constructor() {
        // call parent
        super();

        this.optionsChange();
    }

    optionsChange() {
        this.$body.on('change', '[data-product-option-change]', (event) => {
            this.emit('product-option-change', event, event.target);
        });
    }
}
