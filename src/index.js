import {
    AccountHooks,
    CartHooks,
    CurrencySelectorHooks,
    ProductHooks,
    SearchHooks,
    CountryHooks
    } from './hooks/index';
import {
    RemoteCountry,
    RemoteProduct,
    RemoteProductAttributes,
    Search,
    Cart
    } from './remote/index';

let internals = {
        hookTypes: {}
    },
    implementation;

internals.hookClasses = {
    account: AccountHooks,
    cart: CartHooks,
    currencySelector: CurrencySelectorHooks,
    product: ProductHooks,
    search: SearchHooks,
    country: CountryHooks
};

internals.init = function (hooks) {
    Object.keys(hooks).forEach((hook) => {
        internals.hookTypes[hook] = new internals.hookClasses[hook]();
    });
};

internals.hooks = function (hookTypes) {
    function parseHooks(hookName) {
        let hookType = hookName.split('-')[0];

        if (hookTypes[hookType] === undefined) {
            throw new Error(hookType + ' is not a valid hookType');
        }

        return hookTypes[hookType];
    }

    return {
        on(hookName, callback) {
            let hook = parseHooks(hookName);

            return hook.on(hookName, callback);
        },
        off(hookName, callback) {
            let hook = parseHooks(hookName);

            return hook.off(hookName, callback);
        },
        emit(hookName, data) {
            let hook = parseHooks(hookName);

            return hook.emit(hookName, data);
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

internals.init(internals.hookClasses);

implementation = internals.remote();
implementation.hooks = internals.hooks(internals.hookTypes);

export default implementation;
