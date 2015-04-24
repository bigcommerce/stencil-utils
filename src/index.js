import {
    AccountEvents,
    CartEvents,
    CurrencySelectorEvents,
    ProductEvents
} from './events/index';
import { RemoteCountry } from './remote/index';

var internals = {
    events: {
        init() {
            Object.keys(this).forEach((key) => {
                if ((key !== 'on') && (key !== 'init')){
                    this[key].emitterInit();
                }
            });
        },
        on(event, callback) {
            let eventType = event.split('-')[0];

            if (this[eventType] === undefined) {
                throw new Error(eventType + ' is not a valid eventType');
            }

            return this[eventType].on(event, callback);
        },
        off(event, callback){
            let eventType = event.split('-')[0];

            if (this[eventType] === undefined) {
                throw new Error(eventType + 'is not a valid eventType');
            }

            return this[eventType].on(event, callback);
        },
        account: new AccountEvents(),
        cart: new CartEvents(),
        currencySelector: new CurrencySelectorEvents(),
        product: new ProductEvents()
    },
    remote: {
        country: new RemoteCountry()
    }
};

export default {
    events: internals.events,
    remote: internals.remote
}
