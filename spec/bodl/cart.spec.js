import BodlEvents, { AddCartItemEvent, RemoveCartItemEvent } from '@bigcommerce/bodl-events';

import CartHandler from '../../src/bodl/cart';

describe('Bodl Cart Class', () => {
    let handleItemAdd; let handleItemRemove; let
        cartHandler;

    beforeEach(() => {
        handleItemAdd = jest.fn();
        handleItemRemove = jest.fn();
        const cart = {
            handleItemAdd,
            handleItemRemove,
        };
        cartHandler = new CartHandler(cart);
    });

    it('should be able to initialize', () => {
        expect(cartHandler).toBeDefined();
    });

    it('should be able to handle add item event', () => {
        const data = {
            itemId: 1,
        };
        const callback = jest.fn();
        BodlEvents.cart.emit(AddCartItemEvent.CREATE, { data, callback });
        expect(handleItemAdd).toHaveBeenCalledWith(data, callback);
    });

    it('should be able to handle remove item event', () => {
        const itemId = 1;
        const callback = jest.fn();

        BodlEvents.cart.emit(RemoveCartItemEvent.CREATE, { data: itemId, callback });
        expect(handleItemRemove).toHaveBeenCalledWith(itemId, callback);
    });
});
