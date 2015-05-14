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
    },
    implementation;

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
    function parseEvent(eventName) {
        let eventType = eventName.split('-')[0];

        if (eventTypes[eventType] === undefined) {
            throw new Error(eventType + ' is not a valid eventType');
        }

        return eventTypes[eventType];
    }

    return {
        on(eventName, callback) {
            let event = parseEvent(eventName);

            return event.on(eventName, callback);
        },
        off(eventName, callback) {
            let event = parseEvent(eventName);

            return event.off(eventName, callback);
        },
        emit(eventName, callback) {
            let event = parseEvent(eventName);

            return event.emit(eventName, callback);
        }
    };
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

implementation = internals.remote();
implementation.events = internals.events(internals.eventTypes);

export default implementation;
