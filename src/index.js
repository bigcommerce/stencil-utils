import {
    AccountEvents,
    CartEvents,
    CurrencySelectorEvents,
    ProductEvents
} from './events/index';
import { RemoteCountry } from './remote/index';

var internals = {
    events: {
        account: new AccountEvents(),
        cart: new CartEvents(),
        currencySelector: new CurrencySelectorEvents(),
        product: new ProductEvents()
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
