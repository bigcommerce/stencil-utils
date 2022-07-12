import BodlEvents from '@bigcommerce/bodl-events';
import CartApi from '../../src/api/cart';

describe('Cart Api Class', () => {
    let cart;
    beforeEach(() => {
        cart = new CartApi();
    });
    it('should be able to initialize', () => {
        expect(cart).toBeDefined();
    });

    it('should be able to emit event on item add', () => {
        const addItem = jest.fn();
        BodlEvents.cart.addItem(addItem);
        cart.itemAdd({}, jest.fn());

        expect(addItem).toHaveBeenCalled();
    });

    it('should be able to emit event on item remove', () => {
        const removeItem = jest.fn();
        BodlEvents.cart.removeItem(removeItem);
        cart.itemRemove(1, jest.fn());

        expect(removeItem).toHaveBeenCalled();
    });
});
