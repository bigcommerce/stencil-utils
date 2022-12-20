import { isBODLEnabled } from '../helpers';
import Base from './base';

class Cart extends Base {
    emitAddItem(response) {
        this.emit(this.bodlEvents.AddCartItemEvent.CREATE, response);
    }

    emitRemoveItem(response) {
        if (this.shouldEmitRemoveItem(response)) {
            this.emit(this.bodlEvents.RemoveCartItemEvent.CREATE, response);
        }
    }

    shouldEmitRemoveItem(response) {
        return response.data.line_items?.length > 0;
    }

    emit(eventName, response) {
        const payload = this.preparePayload(response);
        this.bodlEvents.cart.emit(eventName, payload);
    }

    preparePayload(response) {
        if (isBODLEnabled() && !response.data.error) {
            return {
                channel_id: response.data.channel_id,
                currency: response.data.currency,
                cart_value: response.data.cart_value,
                line_items: response.data.line_items,
            };
        }

        return {};
    }
}

export default Cart;
