import Base from './base';
import { getBODLEvents } from '../helpers';

export default class extends Base {
    attachHandlers() {
        this.attachAddToCartHandler();
        this.attachRemoveFromCartHandler();
    }

    attachAddToCartHandler() {
        const bodlEvents = getBODLEvents();
        bodlEvents.cart.addItem((payload) => {
            this.api.handleItemAdd(payload.data, payload.callback);
        });
    }

    attachRemoveFromCartHandler() {
        const bodlEvents = getBODLEvents();
        bodlEvents.cart.removeItem((payload) => {
            this.api.handleItemRemove(payload.data, payload.callback);
        });
    }
}
