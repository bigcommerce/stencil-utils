import CartEvents from './cart';
import ProductEvents from './product';
import AccountEvents from './account';

export default {
    cart: new CartEvents({}),
    product: new ProductEvents({}),
    account: new AccountEvents({})
};
