import CartHooks from './cart';
import CookieHooks from './cookie';
import CurrencySelectorHooks from './currency-selector';
import ProductHooks from './product';
import SearchHooks from './search';
import FacetedSearchHooks from './faceted-search';
import SortByHooks from './sort-by';

const internals = {};

internals.classes = {
    cart: new CartHooks(),
    cookie: new CookieHooks(),
    currencySelector: new CurrencySelectorHooks(),
    product: new ProductHooks(),
    search: new SearchHooks(),
    facetedSearch: new FacetedSearchHooks(),
    sortBy: new SortByHooks(),
};

internals.parseHooks = function (hookName) {
    const hookType = hookName.split('-')[0];

    if (internals.classes[hookType] === undefined) {
        throw new Error(`${hookType} is not a valid hookType`);
    }

    return internals.classes[hookType];
};

class Hooks {
    on(hookName, callback) {
        const hook = internals.parseHooks(hookName);

        return hook.on(hookName, callback);
    }

    off(hookName, callback) {
        const hook = internals.parseHooks(hookName);

        return hook.off(hookName, callback);
    }

    emit(hookName) {
        const hook = internals.parseHooks(hookName);

        return hook.emit(...arguments);
    }
}

export default new Hooks();
