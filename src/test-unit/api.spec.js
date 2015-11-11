import api from '../api';

describe('API', () => {

    beforeEach(() => {
    });

    afterEach(() => {
    });

    it('should check existance of country, productAttributes, product, search, cart, cookie, getPage', () => {
        expect(api.country).toBeDefined();
        expect(api.productAttributes).toBeDefined();
        expect(api.product).toBeDefined();
        expect(api.search).toBeDefined();
        expect(api.cookie).toBeDefined();
        expect(api.getPage).toBeDefined();
    });
});
