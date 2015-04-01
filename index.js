import Cart from './src/events/cart';
import Product from './src/events/product';
import Account from './src/events/account';

var internals = {
    events:{
        product: new Product(),
        cart: new Cart(),
        Account: new Account()
    }
};

export class StencilUtils {
    constructor(){
        this.events = internals.events;
    }
}
