import Base from './base';

class Cart extends Base {
    create(payload) {
        this.bodlEvents.cart.emit(this.bodlEvents.AddCartItemEvent.CREATE, payload);
    }

    remove(payload) {
        this.bodlEvents.cart.emit(this.bodlEvents.RemoveCartItemEvent.CREATE, payload);
    }
}

const cartEmitter = new Cart();
export default cartEmitter;
