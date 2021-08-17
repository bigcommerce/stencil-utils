import Base from './base';

export default class extends Base {
    itemAdd(wishlistId, productId, options, callback) {
        const url = `/wishlist.php?action=add&wishlistid=${wishlistId}&product_id=${productId}`;
        let opts = options;
        let callbackFn = callback;

        if (typeof opts === 'function') {
            callbackFn = opts;
            opts = {};
        }

        this.makeRequest(url, 'POST', opts, false, callbackFn);
    }
}
