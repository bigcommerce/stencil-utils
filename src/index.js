import Cart from './events/cart';
import Product from './events/product';
import Account from './events/account';

var internals = {
    events: {
        product: new Product(),
        cart: new Cart(),
        Account: new Account()
    }
};

export default class StencilUtils {
    constructor() {
        this.events = internals.events;
    }
}
