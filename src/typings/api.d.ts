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
        errors: string[];
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
        getById(id: number, callback: TemplateRequestCallback<string>): void;
        getByName(name: string, callback: TemplateRequestCallback<string>): void;
    }

    class ProductAttributesApi extends BaseApi {
        endpoint: string;
        inCartEndpoint: string;

        optionChange(productId: number, params: any, callback: TemplateRequestCallback<string>): void;
        optionChange<T extends Template>(productId: number, params: any, template: Template & T, callback: TemplateRequestCallback<T>): void;
        configureInCart<O extends RequestOptions, T = RequestTemplate<O>>(itemId: number, params: RequestOptions & O, callback: TemplateRequestCallback<T>): void;
    }

    class ProductApi extends BaseApi {
        endpoint: string;
        getById(productId: number, callback: TemplateRequestCallback<string>): void;
        getById<O extends RequestOptions, T = RequestTemplate<O>>(productId: number, params: RequestOptions & O, callback: TemplateRequestCallback<T>): void;
    }

    class SearchApi extends BaseApi {
        endpoint: string;
        search(query: string, callback: TemplateRequestCallback<string>): void;
        search<O extends RequestOptions, T = RequestTemplate<O>>(query: string, params: RequestOptions & O, callback: TemplateRequestCallback<T>): void;
    }

    class CartApi extends BaseApi {
        getCart(options: RequestOptions, callback: JsonRequestCallback<Cart[]>): void;
        getCartQuantity(options: RequestOptions, callback: QuantityRequestCallback): void;
        itemAdd(formData: FormData, callback: JsonRequestCallback<{ data: { cart_item: AddedCartItem; }; }>): void;
        itemUpdate(itemId: string, qty: number, callback: JsonRequestCallback<{ data: ApiStatusResponse; }>): void;
        itemUpdate(itemId: CartUpdateItem[], callback: JsonRequestCallback<{ data: ApiStatusResponse; }>): void;
        itemRemove(itemId: string, callback: JsonRequestCallback<{ data: ApiStatusResponse; }>): void;
        update(items: CartUpdateItem[], callback: JsonRequestCallback<{ data: ApiStatusResponse; }>): void;
        getContent(callback: TemplateRequestCallback<string>): void;
        getContent<O extends RequestOptions, T = RequestTemplate<O>>(options: RequestOptions & O, callback: TemplateRequestCallback<T>): void;
        getShippingQuotes(params: any, callback: GetShippingQuoteRequestCallback<string>): void;
        getShippingQuotes<T extends Template>(params: any, renderWith: Template & T, callback: GetShippingQuoteRequestCallback<T>): void;
        submitShippingQuote(quoteId: number, callback: (error: string) => void): void;
        applyCode(code: string, callback: JsonRequestCallback<{ data: ApiStatusResponse; }>): void;
        applyGiftCertificate(code: string, callback: JsonRequestCallback<{ data: ApiStatusResponse; }>): void;
    }

    interface Internals {
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
