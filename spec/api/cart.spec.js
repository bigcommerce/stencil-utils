import CartApi from '../../src/api/cart';
import { getBODLEvents } from '../../src/bodl/helpers';

describe('Cart Api Class', () => {
    let cart, bodlEvents;

    beforeEach(() => {
        bodlEvents = getBODLEvents();
        cart = new CartApi();

        cart.makeRequest = jest.fn((_, _1, _2, _3, cb) => {
            cb();
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
