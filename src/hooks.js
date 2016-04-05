import CartHooks from './hooks/cart';
import CookieHooks from './hooks/cookie';
import CurrencySelectorHooks from './hooks/currency-selector';
import ProductHooks from './hooks/product';
import SearchHooks from './hooks/search';
import FacetedSearchHooks from './hooks/faceted-search';
import SortByHooks from './hooks/sort-by';

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

        return hook.emit.apply(hook, arguments);
    }
}

export default new Hooks();
