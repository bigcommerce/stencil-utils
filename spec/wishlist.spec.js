import Wishlist from '../src/api/wishlist';

jest.mock('../src/api/base');

describe('Wishlist', () => {
    const mockedUrl = '/wishlist.php?action=add&wishlistid=14&product_id=111';
    let mockedCallback;
    let wishlist;

    beforeEach(() => {
        mockedCallback = jest.fn();
        wishlist = new Wishlist();
    });

    it('should add a product to the wishlist without options', () => {
        wishlist.itemAdd('14', '111', mockedCallback);

        expect(wishlist.makeRequest).toHaveBeenCalledWith(mockedUrl, 'POST', {}, false, mockedCallback);
    });

    it('should add a product to the wishlist with options', () => {
        const mockedOptions = {
            variantId: '10',
        };

        wishlist.itemAdd('14', '111', mockedOptions, mockedCallback);

        expect(wishlist.makeRequest).toHaveBeenCalledWith(mockedUrl, 'POST', { variantId: '10' }, false, mockedCallback);
    });
});
