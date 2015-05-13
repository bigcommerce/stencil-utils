import {
    AccountEvents,
    CartEvents,
    CurrencySelectorEvents,
    ProductEvents,
    SearchEvents
    } from './events/index';
import {
    RemoteCountry,
    RemoteProduct,
    RemoteProductAttributes,
    Search,
    Cart
    } from './remote/index';

let internals = {
        eventTypes: {}
    };

internals.eventClasses = {
    account: AccountEvents,
    cart: CartEvents,
    currencySelector: CurrencySelectorEvents,
    product: ProductEvents,
    search: SearchEvents
};

internals.init = function (events) {
    Object.keys(events).forEach((event) => {
        internals.eventTypes[event] = new internals.eventClasses[event]();
    });
};

internals.events = function (eventTypes) {
    return {
        on(events, eventName, callback) {
            let eventType = eventName.split('-')[0];

            if (eventTypes[eventType] === undefined) {
                throw new Error(eventType + ' is not a valid eventType');
            }

            return eventTypes[eventType].on(events, eventName, callback);
        },
        off(events, eventName, callback){
            let eventType = eventName.split('-')[0];

            if (eventTypes[eventType] === undefined) {
                throw new Error(eventType + ' is not a valid eventType');
            }

            return eventTypes[eventType].off(events, eventName, callback);
        }
    }
};

internals.remote = function () {
    return {
        country: new RemoteCountry(),
        productAttributes: new RemoteProductAttributes(),
        product: new RemoteProduct(),
        search: new Search(),
        cart: new Cart()
    }
};

internals.init(internals.eventClasses);

export default {
    events: internals.events(internals.eventTypes),
    remote: internals.remote()
}
