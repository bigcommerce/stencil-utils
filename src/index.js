import {
    AccountEvents,
    CartEvents,
    CurrencySelectorEvents,
    ProductEvents
    } from './events/index';
import { RemoteCountry } from './remote/index';

var events = {
    account: new AccountEvents(),
    cart: new CartEvents(),
    currencySelector: new CurrencySelectorEvents(),
    product: new ProductEvents()
};

function init(events){
    Object.keys(events).forEach((event) => {
       events[event].emitterInit();
    });
}

init(events);

var internals = {
    events: {
        on(event, callback) {
            let eventType = event.split('-')[0];

            if (events[eventType] === undefined) {
                throw new Error(eventType + ' is not a valid eventType');
            }

            return events[eventType].on(event, callback);
        },
        off(event, callback){
            let eventType = event.split('-')[0];

            if (events[eventType] === undefined) {
                throw new Error(eventType + ' is not a valid eventType');
            }

            return events[eventType].off(event, callback);
        }
    },
    remote: {
        country: new RemoteCountry()
    }
};

export default {
    events: internals.events,
    remote: internals.remote
}
