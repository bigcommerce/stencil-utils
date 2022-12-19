import Cart from '../../src/bodl/emitters/cart';

describe('Emitter Cart Class', () => {
    let cart;
    beforeEach(() => {
        cart = new Cart();
    });

    it('should emit add product event', () => {
        const addItem = jest.fn();
        cart.bodlEvents.cart.addItem(addItem);
        cart.emitAddItem({ data: {
            cart_item: 1,
            line_items: [
                {},
            ]
        }});
        expect(addItem).toHaveBeenCalled();
    });

    it('should not emit remove product event for the last item in the cart', () => {
        const removeItem = jest.fn();
        cart.bodlEvents.cart.removeItem(removeItem);
        cart.emitRemoveItem({ data: {
            channel_id: 1,
            currency: 'USD',
            cart_value: 0,
            line_items: [],
        }});
        expect(removeItem).not.toHaveBeenCalled();
    });

    it('should emit remove product event', () => {
        const removeItem = jest.fn();
        cart.bodlEvents.cart.removeItem(removeItem);
        cart.emitRemoveItem({ data: {
            channel_id: 1,
            currency: 'USD',
            cart_value: 49.5,
            line_items: [
                {
                    product_id: 86,
                    product_name: '[Sample] Chemex Coffeemaker 3 Cup',
                    sku: 'CC3C',
                    base_price: 49.5,
                    sale_price: 49.5,
                    retail_price: 0,    
                    purchase_price: 49.5,
                    quantity: 1,
                    currency: 'USD',
                    discount: 0,
                    brand_name: 'Bigcommerce',
                    category_names: ['Kitchen', 'Shop All'],
                },
            ],
        }});
        expect(removeItem).toHaveBeenCalled();
    });
});
