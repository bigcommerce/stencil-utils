import {
    AccountEvents,
    CartEvents,
    CurrencySelectorEvents,
    ProductEvents
    } from './events/index';
import {
    RemoteCountry,
    RemoteProductAttributes
    } from './remote/index';

let internals = {
        eventTypes: {}
    };

internals.eventClasses = {
    account: AccountEvents,
    cart: CartEvents,
    currencySelector: CurrencySelectorEvents,
    product: ProductEvents
};

internals.init = function (events) {
    Object.keys(events).forEach((event) => {
        internals.eventTypes[event] = new internals.eventClasses[event]();
        internals.eventTypes[event].emitterInit();
    });
};

internals.events = function (eventTypes) {
    return {
        on(event, callback) {
            let eventType = event.split('-')[0];

            if (eventTypes[eventType] === undefined) {
                throw new Error(eventType + ' is not a valid eventType');
            }

            return eventTypes[eventType].on(event, callback);
        },
        off(event, callback){
            let eventType = event.split('-')[0];

            if (eventTypes[eventType] === undefined) {
                throw new Error(eventType + ' is not a valid eventType');
            }

            return eventTypes[eventType].off(event, callback);
        }
    }
};

internals.remote = function () {
    return {
        country: new RemoteCountry(),
        productAttributes: new RemoteProductAttributes()
    }
};

internals.init(internals.eventClasses);

export default {
    events: internals.events(internals.eventTypes),
    remote: internals.remote()
}
