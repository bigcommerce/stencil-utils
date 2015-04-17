import Cart from './events/cart';
import Product from './events/product';
import Account from './events/account';
import { RemoteCountry } from './remote/index';

var internals = {
    events: {
        product: new Product(),
        cart: new Cart(),
        account: new Account()
    },
    remote: {
        country: new RemoteCountry()
    }
};

export default class StencilUtils {
    constructor() {
        this.events = internals.events;
        this.remote = internals.remote;
    }
}
