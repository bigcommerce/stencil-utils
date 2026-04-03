import CartApi from '../../src/api/cart';
import { getBODLEvents } from '../../src/bodl/helpers';

describe('Cart Api Class', () => {
    let cart;
    let bodlEvents;

    beforeEach(() => {
        bodlEvents = getBODLEvents();
        cart = new CartApi();

        cart.makeRequest = jest.fn((_, _1, _2, _3, cb) => {
            cb(null, {
                data: {
                    cart_id: '77d0405d-1d8c-41d7-b610-e05577510cb5',
                    cart_item: {
                        id: '2f6ee649-62f8-469a-9f70-43662025d901',
                        hash: '1284827bbcd39b403d24df2cfd3103ab',
                        product_id: 86,
                        thumbnail:
                            'https://build-bcapp-vm-2022-10-13t13-31-44z.store.bcdev/store/eusgb9764o/products/86/images/286/ablebrewingsystem4.1670518947.190.285.jpg?c=1',
                        url: 'https://my-dev-store-949192786.store.bcdev/able-brewing-system',
                    },
                    channel_id: 1,
                    currency: 'USD',
                    cart_value: 499.5,
                    line_items: [
                        {
                            product_id: 86,
                            product_name: '[Sample] Chemex Coffeemaker 3 Cup',
                            sku: 'CC3C',
                            base_price: 49.5,
                            sale_price: 49.5,
                            retail_price: 0,
                            purchase_price: 49.5,
                            quantity: 1,
                            currency: 'USD',
                            discount: 0,
                            brand_name: 'Bigcommerce',
                            category_names: ['Kitchen', 'Shop All'],
                        },
                    ],
                },
            });
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should be able to initialize', () => {
        expect(cart).toBeDefined();
    });

    it('should be able to emit event on item', () => {
        const addItem = jest.fn();
        bodlEvents.cart.addItem(addItem);
        cart.itemAdd({}, jest.fn());

        expect(addItem).toHaveBeenCalled();
    });

    it('should be able to emit event on item remove', () => {
        const removeItem = jest.fn();
        bodlEvents.cart.removeItem(removeItem);
        cart.itemRemove(1, jest.fn());

        expect(removeItem).toHaveBeenCalled();
    });

    it('should be able to call api on item add', () => {
        cart.itemAdd({}, jest.fn());

        expect(cart.makeRequest).toHaveBeenCalled();
    });

    it('should be able to call api on item remove', () => {
        cart.itemRemove(1, jest.fn());

        expect(cart.makeRequest).toHaveBeenCalled();
    });
});

describe('getShippingQuotes', () => {
    let cart;

    beforeEach(() => {
        cart = new CartApi();
        cart.remoteRequest = jest.fn();
    });

    // Mirrors: utils.api.cart.getShippingQuotes(params, 'cart/shipping-quotes', callback)
    test('3-arg call (no requestOptions): template and params are forwarded', () => {
        const callback = jest.fn();

        cart.getShippingQuotes({ zip: '10001' }, 'cart/shipping-quotes', callback);

        expect(cart.remoteRequest).toHaveBeenCalledWith(
            '/shipping-quote',
            'GET',
            expect.objectContaining({ params: { zip: '10001' }, template: 'cart/shipping-quotes' }),
            callback,
        );
    });

    // Mirrors: utils.api.cart.getShippingQuotes(params, 'cart/shipping-quotes', callback, { baseUrl: secureBaseUrl })
    test('4-arg call (with baseUrl): baseUrl is forwarded and template is not overwritten', () => {
        const callback = jest.fn();

        cart.getShippingQuotes({ zip: '10001' }, 'cart/shipping-quotes', callback, { baseUrl: 'https://store.example.com/es' });

        const [, , passedOptions] = cart.remoteRequest.mock.calls[0];
        expect(passedOptions.baseUrl).toBe('https://store.example.com/es');
        expect(passedOptions.template).toBe('cart/shipping-quotes');
        expect(passedOptions.params).toEqual({ zip: '10001' });
    });

    // Regression: baseUrl must not be silently dropped when renderWith is omitted
    test('3-arg call without renderWith (params, callback, requestOptions): baseUrl is forwarded', () => {
        const callback = jest.fn();

        cart.getShippingQuotes({ zip: '10001' }, callback, { baseUrl: 'https://store.example.com/es' });

        const [, , passedOptions, actualCallback] = cart.remoteRequest.mock.calls[0];
        expect(actualCallback).toBe(callback);
        expect(passedOptions.baseUrl).toBe('https://store.example.com/es');
        expect(passedOptions.params).toEqual({ zip: '10001' });
    });
});
