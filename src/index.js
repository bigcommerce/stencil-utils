import {
    AccountEvents,
    CartEvents,
    CurrencySelectorEvents,
    ProductEvents
    } from './events/index';
import { RemoteCountry } from './remote/index';

let internals = {};

internals.eventTypes = {
    account: new AccountEvents(),
    cart: new CartEvents(),
    currencySelector: new CurrencySelectorEvents(),
    product: new ProductEvents()
};

internals.init = function (events) {
    Object.keys(events).forEach((event) => {
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
        remote: {
            country: new RemoteCountry()
        }
    }
};

internals.init(internals.eventTypes);

export default {
    events: internals.events(internals.eventTypes),
    remote: internals.remote()
}
