import Base from '../../src/api/base';
import ProductAttributes from '../../src/api/product-attributes';

jest.mock('../../src/api/base');

describe('ProductAttributes', () => {
    let productAttributes;

    beforeEach(() => {
        Base.prototype.remoteRequest = jest.fn();
        productAttributes = new ProductAttributes();
    });

    describe('optionChange', () => {
        // Mirrors: optionChange(simpleProductId, $form.serialize(), (err, response) => { ... })
        test('3-arg call (no template, no baseUrl): callback is invoked with server response', () => {
            const fakeResponse = { data: { stock: 5 } };
            Base.prototype.remoteRequest = jest.fn((url, method, options, internalCb) => {
                internalCb(null, fakeResponse);
            });
            productAttributes = new ProductAttributes();
            const callback = jest.fn();

            productAttributes.optionChange(99, 'qty=1', callback);

            expect(callback).toHaveBeenCalledWith(null, fakeResponse);
            expect(productAttributes.remoteRequest).toHaveBeenCalledWith(
                '/product-attributes/99',
                'POST',
                expect.objectContaining({ template: null }),
                expect.any(Function),
            );
        });

        // Mirrors: optionChange(productId, $form.serialize(), 'products/bulk-discount-rates', (err, response) => { ... }, { baseUrl: this.context.secureBaseUrl })
        test('5-arg call (template + baseUrl): callback is invoked and baseUrl is forwarded', () => {
            const fakeResponse = { data: { price: '$9.99' }, content: '<div/>' };
            Base.prototype.remoteRequest = jest.fn((url, method, options, internalCb) => {
                internalCb(null, fakeResponse);
            });
            productAttributes = new ProductAttributes();
            const callback = jest.fn();

            productAttributes.optionChange(99, 'qty=1', 'products/bulk-discount-rates', callback, { baseUrl: 'https://store.example.com/es' });

            expect(callback).toHaveBeenCalledWith(null, fakeResponse);
            const [, , passedOptions] = productAttributes.remoteRequest.mock.calls[0];
            expect(passedOptions.template).toBe('products/bulk-discount-rates');
            expect(passedOptions.baseUrl).toBe('https://store.example.com/es');
        });
    });

    describe('configureInCart', () => {
        test('template + baseUrl stay top-level (flat merge)', () => {
            const callback = jest.fn();

            productAttributes.configureInCart(
                'item-abc',
                { template: 'cart/modals/configure-product' },
                callback,
                { baseUrl: 'https://store.example.com/es' },
            );

            expect(productAttributes.remoteRequest).toHaveBeenCalledWith(
                '/configure-options/item-abc',
                'GET',
                expect.objectContaining({
                    template: 'cart/modals/configure-product',
                    baseUrl: 'https://store.example.com/es',
                }),
                expect.any(Function),
            );
        });

        test('flat merge: extra keys from first arg and baseUrl from requestOptions', () => {
            const callback = jest.fn();

            productAttributes.configureInCart('item-abc', { qty: 1 }, callback, { baseUrl: 'https://store.example.com/es' });

            expect(productAttributes.remoteRequest).toHaveBeenCalledWith(
                '/configure-options/item-abc',
                'GET',
                expect.objectContaining({ qty: 1, baseUrl: 'https://store.example.com/es' }),
                expect.any(Function),
            );
        });

        test('requestOptions.baseUrl wins when first arg also has baseUrl', () => {
            const callback = jest.fn();

            productAttributes.configureInCart(
                'item-abc',
                { template: 'cart/modals/configure-product', baseUrl: 'https://wrong.example.com' },
                callback,
                { baseUrl: 'https://store.example.com/es' },
            );

            const [, , passedOptions] = productAttributes.remoteRequest.mock.calls[0];
            expect(passedOptions.baseUrl).toBe('https://store.example.com/es');
            expect(passedOptions.template).toBe('cart/modals/configure-product');
        });
    });
});
