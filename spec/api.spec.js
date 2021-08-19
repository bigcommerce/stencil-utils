import api from '../src/api';

describe('API', () => {
    it('should check existance of country, productAttributes, product, search, cart, wishlist, cookie, getPage', () => {
        expect(api.country).toBeDefined();
        expect(api.productAttributes).toBeDefined();
        expect(api.product).toBeDefined();
        expect(api.search).toBeDefined();
        expect(api.wishlist).toBeDefined();
        expect(api.getPage).toBeDefined();
    });
});
