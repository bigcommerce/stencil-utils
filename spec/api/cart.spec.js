import CartApi from '../../src/api/cart';
import { getBODLEvents } from '../../src/bodl/helpers';

describe('Cart Api Class', () => {
    let cart; let
        bodlEvents;
    beforeEach(() => {
        bodlEvents = getBODLEvents();
        cart = new CartApi();
    });
    it('should be able to initialize', () => {
        expect(cart).toBeDefined();
    });

    it('should be able to emit event on item add', () => {
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
});
