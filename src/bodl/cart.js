import BodlEvents from '@bigcommerce/bodl-events';

import Base from './base';

export default class extends Base {
    attachHandlers() {
        this.attachAddToCartHandler();
        this.attachRemoveFromCartHandler();
    }

    attachAddToCartHandler() {
        BodlEvents.cart.addItem((payload) => {
            this.api.handleItemAdd(payload.data, payload.callback);
        });
    }

    attachRemoveFromCartHandler() {
        BodlEvents.cart.removeItem((payload) => {
            this.api.handleItemRemove(payload.data, payload.callback);
        });
    }
}
