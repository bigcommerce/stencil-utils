/// <reference types="jquery" />

export declare namespace Api {
    type StringObject = { [key: string]: string; };
    type GenericObject = { [key: string]: any; };

    type Template = string|string[]|StringObject;
    type ValidMethods = 'GET'|'POST'|'PUT'|'DELETE';
    type RequestTemplate<O, T = 'template'> = T extends keyof O ? O[T] : {} extends O ? string : never;
    type TemplateResponse<T> = T extends string[]|StringObject ? GenericObject : string;
    type TemplateRequestCallback<T> = (error: string, response: TemplateResponse<T>) => void|any;
    type JsonRequestCallback<T = GenericObject> = (error: string, response: T) => void|any;
    type QuantityRequestCallback = (error: string, response: number) => void|any;
    type GetShippingQuoteRequestCallback<T> = (error: string, response: GetShippingQuoteResponse<T>) => void|any;

    interface RequestOptions {
        baseUrl?: string;
        formData?: FormData;
        params?: any;
        config?: any;
        template?: Template;
        includeOptions?: boolean;
    }

    interface Cart {
        baseAmount: number;
        cartAmount: number;
        coupons: any[];
        createdTime: string;
        currency: Currency;
        customerId: number;
        discountAmount: number;
        discounts: Discount[];
        email: string;
        id: string;
        isTaxIncluded: boolean;
        lineItems: {
            customItems: CustomProduct[];
            digitalItems: DigitalProduct[];
            giftCertificates: GiftCertificateProduct[];
            physicalItems: PhysicalProduct[]
        }
    }

    interface Currency {
        code: string;
        decimalPlaces: number;
        name: string;
        symbol: string;
    }

    interface Discount {
        id: number;
        discountedAmount: number;
    }

    interface BaseProduct {
        id: string;
        parentId: string;
        variantId: string;
        productId: number;
        sku: string;
        name: string;
        url: string;
        quantity: number;
        isTaxable: boolean;
        imageUrl: string;
        discounts: Discount[];
        discountAmount: number;
        couponAmount: number;
        listPrice: number;
        salePrice: number;
        extendedListPrice: number;
        extendedSalePrice: number;
        Options: ProductOption[];
        brand: string;
    }

    interface PhysicalProduct extends BaseProduct {}

    interface DigitalProduct extends BaseProduct {}

    interface CustomProduct {
        id: string;
        sku: string;
        name: string;
        quantity: number;
        listPrice: number;
        extendedListPrice: number;
    }

    interface GiftCertificateProduct {
        id: string;
        name: string;
        theme: string;
        amount: number;
        isTaxable: boolean;
        sender: {
            name: string;
            email: string;
        };
        recipient: {
            name: string;
            email: string;
        };
        message: string;
    }

    interface ProductOption {
        name: string;
        nameId: number;
        value: string;
        valueId: number;
    }

    interface AddedCartItem {
        hash: string;
        id: string;
        product_id: number;
        thumbnail: string;
        url: string;
    }

    interface CartUpdateItem {
        id: string;
        quantity: number;
    }

    interface ShippingMethod {
        id: number;
        type: string;
        cost: {
            formatted: string;
            value: number;
        };
        provider_name: string;
    }

    interface UpsShippingMethod extends ShippingMethod {
        logo_path?: string;
        description: string;
    }

    interface GetShippingQuoteResponse<T> {
        content: TemplateResponse<T>;
        data: {
            quotes: {
                shipping_methods: ShippingMethod[];
                ups_shipping_methods: UpsShippingMethod[];
            };
        };
    }

    interface ApiStatusResponse {
        errors?: string[];
        status: string;
    }

    class BaseApi {
        constructor(version: string);
        remoteVersion: string;
        remoteBaseEndpoint: string;

        makeRequest<O extends RequestOptions, T = RequestTemplate<O>>(url: string, method: ValidMethods, options: RequestOptions & O, remote: boolean, callback: TemplateRequestCallback<T>): void;
        remoteRequest<O extends RequestOptions, T = RequestTemplate<O>>(endpoint: string, method: ValidMethods, options: RequestOptions & O, callback: TemplateRequestCallback<T>): void;
    }

    class CountryApi extends BaseApi {
        endpoint: string;

        /**
         *
         * Get country data by id wrapper
         *
         * @param {Number} id
         * @param {Function} callback
         */
        getById(id: number, callback: TemplateRequestCallback<string>): void;

        /**
         * Get country data by country name
         * @param {String} name
         * @param callback
         */
        getByName(name: string, callback: TemplateRequestCallback<string>): void;
    }

    class ProductAttributesApi extends BaseApi {
        endpoint: string;
        inCartEndpoint: string;

        /**
         * Get product attributes from selected options
         *
         * @param {Number} productId
         * @param {Object} params
         * @param callback
         */
        optionChange(productId: number, params: any, callback: TemplateRequestCallback<string>): void;

        /**
         * Get product attributes from selected options
         *
         * @param {Number} productId
         * @param {Object} params
         * @param {String|Array|Object}
         * @param callback
         */
        optionChange<T extends Template>(productId: number, params: any, template: Template & T, callback: TemplateRequestCallback<T>): void;

        /**
         * Get product attributes from selected options while editing in cart
         * @param {Number} itemId
         * @param {Object} params
         * @param callback
         */
        configureInCart<O extends RequestOptions, T = RequestTemplate<O>>(itemId: number, params: RequestOptions & O, callback: TemplateRequestCallback<T>): void;
    }

    class ProductApi extends BaseApi {
        endpoint: string;

        /**
         * Get product by ID
         *
         * @param {Number} productId
         * @param {Function} callback
         */
        getById(productId: number, callback: TemplateRequestCallback<string>): void;

        /**
         * Get product by ID
         *
         * @param {Number} productId
         * @param {Object} params
         * @param {Function} callback
         */
        getById<O extends RequestOptions, T = RequestTemplate<O>>(productId: number, params: RequestOptions & O, callback: TemplateRequestCallback<T>): void;
    }

    class SearchApi extends BaseApi {
        endpoint: string;

        /**
         * Get search results
         * @param {String} query
         * @param {Function} callback
         */
        search(query: string, callback: TemplateRequestCallback<string>): void;

        /**
         * Get search results
         * @param {String} query
         * @param {Object} params
         * @param {Function} callback
         */
        search<O extends RequestOptions, T = RequestTemplate<O>>(query: string, params: RequestOptions & O, callback: TemplateRequestCallback<T>): void;
    }

    class CartApi extends BaseApi {
        /**
         * Get the current Cart's details, either with or without Product Option selections.
         *
         * @param options
         * @param {Function} callback
         */
        getCart(options: RequestOptions, callback: JsonRequestCallback<Cart[]>): void;

        /**
         * Get a sum of the cart line item quantities
         *
         * @param options
         * @param {Function} callback
         */
        getCartQuantity(options: RequestOptions, callback: QuantityRequestCallback): void;

        /**
         * Add item to cart with options (variants)
         *
         * @param {FormData} formData
         * @param {Function} callback
         */
        itemAdd(formData: FormData, callback: JsonRequestCallback<{ data: { cart_item: AddedCartItem; }; }>): void;

        /**
         * Update cart item quantity
         *
         * @param {String} itemId
         * @param {Number} qty
         * @param {Function} callback
         */
        itemUpdate(itemId: string, qty: number, callback: JsonRequestCallback<{ data: ApiStatusResponse; }>): void;

        /**
         * Update cart item quantity
         *
         * @param {Object} itemId
         * @param {Function} callback
         */
        itemUpdate(itemId: CartUpdateItem[], callback: JsonRequestCallback<{ data: ApiStatusResponse; }>): void;

        /**
         * Remove cart items
         *
         * Calls the internal update function with quantity: 0
         *
         * @param {String} itemId
         * @param {Function} callback
         */
        itemRemove(itemId: string, callback: JsonRequestCallback<{ data: ApiStatusResponse; }>): void;

        /**
         * Get giftwrapping options
         * @param {String} itemId
         * @param {Function} callback
         */
        getItemGiftWrappingOptions(itemId: string, callback: TemplateRequestCallback<string>): void;

        /**
         * Get giftwrapping options
         * @param {String} itemId
         * @param {Object} options
         * @param {Function} callback
         */
        getItemGiftWrappingOptions<O extends RequestOptions, T = RequestTemplate<O>>(itemId: string, options: RequestOptions & O, callback: TemplateRequestCallback<O>): void;

        /**
         * Submit giftwrapping options
         *
         * @param {String} itemId
         * @param {Function} callback
         */
        submitItemGiftWrappingOption(itemId: string, callback: JsonRequestCallback<{ data: ApiStatusResponse; }>): void;

        /**
         * Submit giftwrapping options
         *
         * @param {String} itemId
         * @param {Object} params
         * @param {Function} callback
         */
        submitItemGiftWrappingOption<O extends RequestOptions, T = RequestTemplate<O>>(itemId: string, params: RequestOptions & O, callback: JsonRequestCallback<{ data: ApiStatusResponse; }>): void;

        /**
         * Update cart items
         *
         * @param {Array} items
         * @param {Function} callback
         */
        update(items: CartUpdateItem[], callback: JsonRequestCallback<{ data: ApiStatusResponse; }>): void;

        /**
         * Get cart content
         *
         * @param {Function} callback
         */
        getContent(callback: TemplateRequestCallback<string>): void;

        /**
         * Get cart content
         *
         * @param {Object} options
         * @param {Function} callback
         */
        getContent<O extends RequestOptions, T = RequestTemplate<O>>(options: RequestOptions & O, callback: TemplateRequestCallback<T>): void;

        /**
         * Get cart shipping quote
         *
         * @param {Object} params
         * @param {Function} callback
         */
        getShippingQuotes(params: any, callback: GetShippingQuoteRequestCallback<string>): void;

        /**
         * Get cart shipping quote
         *
         * @param {Object} params
         * @param {String|Array|Object} renderWith
         * @param {Function} callback
         */
        getShippingQuotes<T extends Template>(params: any, renderWith: Template & T, callback: GetShippingQuoteRequestCallback<T>): void;

        /**
         * Submit shipping quote based on quoteId
         *
         * @param {Number} quoteId
         * @param {Function} callback
         */
        submitShippingQuote(quoteId: number, callback: (error: string, response: JsonRequestCallback<{ data: ApiStatusResponse; }>) => void): void;

        /**
         * Apply a coupon code or gift certificate to the cart
         *
         * @param {String} code
         * @param {Function} callback
         */
        applyCode(code: string, callback: JsonRequestCallback<{ data: ApiStatusResponse; }>): void;

        /**
         * Apply a coupon code or gift certificate to the cart
         *
         * @param {Number} code
         * @param {Function} callback
         */
        applyGiftCertificate(code: string, callback: JsonRequestCallback<{ data: ApiStatusResponse; }>): void;
    }

    interface Internals {
        /**
         * Convenience function to request a page via ajax
         */
        getPage<O extends RequestOptions, T = RequestTemplate<O>>(url: string, options: RequestOptions & O, callback: TemplateRequestCallback<T>): void;
    }
}

export interface Api {
    country: Api.CountryApi;
    productAttributes: Api.ProductAttributesApi;
    product: Api.ProductApi;
    search: Api.SearchApi;
    cart: Api.CartApi;
    getPage: Api.Internals['getPage'];
}

export default Api;
