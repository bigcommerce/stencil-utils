import CartHandler from '../../src/bodl/handlers/cart';
import { getBODLEvents, isBODLEnabled } from '../../src/bodl/helpers';

describe('Bodl Cart Class', () => {
    let handleItemAdd; let handleItemRemove; let bodlEvents; let
        cartHandler;

    beforeEach(() => {
        handleItemAdd = jest.fn();
        handleItemRemove = jest.fn();
        bodlEvents = getBODLEvents();
        const cart = {
            handleItemAdd,
            handleItemRemove,
        };
        cartHandler = new CartHandler(cart);
    });

    it('should be able to initialize', () => {
        expect(cartHandler).toBeDefined();
    });

    it('should validte that BODL is enabled', () => {
        expect(isBODLEnabled()).toBeTruthy();
    });

    it('should be able to handle add item event', () => {
        const data = {
            itemId: 1,
        };
        const callback = jest.fn();
        bodlEvents.cart.emit(bodlEvents.AddCartItemEvent.CREATE, { data, callback });
        expect(handleItemAdd).toHaveBeenCalledWith(data, callback);
    });

    it('should be able to handle remove item event', () => {
        const itemId = 1;
        const callback = jest.fn();

        bodlEvents.cart.emit(bodlEvents.RemoveCartItemEvent.CREATE, { data: itemId, callback });
        expect(handleItemRemove).toHaveBeenCalledWith(itemId, callback);
    });
});
