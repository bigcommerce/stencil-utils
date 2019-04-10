/// <reference types="eventemitter2" />
/// <reference types="jquery" />

export declare namespace Hooks {
    class BaseHooks extends EventEmitter2 {
        $body: JQuery<HTMLElement>
    }

    class CartHooks extends BaseHooks {
        itemAdd(): void;
    }

    class CookieHooks extends BaseHooks {}

    class CurrencySelectorHooks extends BaseHooks {
        currencySelector(): void;
    }

    class ProductHooks extends BaseHooks {
        optionsChange(): void;
    }

    class SearchHooks extends BaseHooks {
        quickSearch(): void;
    }

    class FacetedSearchHooks extends BaseHooks {
        searchEvents(): void;
    }

    class SortByHooks extends BaseHooks {
        sortByEvents(): void;
    }


    namespace Internals {
        interface Classes {
            cart: CartHooks;
            cookie: CookieHooks;
            currencySelector: CurrencySelectorHooks;
            product: ProductHooks;
            search: SearchHooks;
            facetedSearch: FacetedSearchHooks;
            sortBy: SortByHooks;
        }

        export const classes: Classes
    }

    interface Internals {
        classes: Internals.Classes;
        parseHooks<H, T extends keyof Internals.Classes>(hookName: H): Internals.Classes[T];
    }
}


export declare class Hooks {
    on<H>(hookname: H, callback: () => void|any): ReturnType<Hooks.Internals['parseHooks']>;
    off<H>(hookname: H, callback: () => void|any): ReturnType<Hooks.Internals['parseHooks']>;
    emit<H>(hookname: H, callback: () => void|any): ReturnType<Hooks.Internals['parseHooks']>;
}

export default Hooks;
