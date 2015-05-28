import AccountHooks from './hooks/account';
import CartHooks from './hooks/cart';
import CurrencySelectorHooks from './hooks/currency-selector';
import ProductHooks from './hooks/product';
import SearchHooks from './hooks/search';
import CountryHooks from './hooks/country';
import FacetedSearchHooks from './hooks/faceted-search';
import SortByHooks from './hooks/sort-by';

let internals = {};

internals.classes = {
    account: new AccountHooks(),
    cart: new CartHooks(),
    currencySelector: new CurrencySelectorHooks(),
    product: new ProductHooks(),
    search: new SearchHooks(),
    country: new CountryHooks(),
    facetedSearch: new FacetedSearchHooks(),
    sortBy: new SortByHooks()
};

internals.parseHooks = function (hookName) {
    let hookType = hookName.split('-')[0];

    if (internals.classes[hookType] === undefined) {
        throw new Error(hookType + ' is not a valid hookType');
    }

    return internals.classes[hookType];
};

class Hooks {
    on(hookName, callback) {
        let hook = internals.parseHooks(hookName);

        return hook.on(hookName, callback);
    }

    off(hookName, callback) {
        let hook = internals.parseHooks(hookName);

        return hook.off(hookName, callback);
    }

    emit(hookName, data) {
        let hook = internals.parseHooks(hookName);

        return hook.emit(hookName, data);
    }
}

export default new Hooks();
