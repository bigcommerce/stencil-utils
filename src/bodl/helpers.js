import { v4 as uuidv4 } from 'uuid';

export const isBODLEnabled = () => typeof window.bodlEvents !== 'undefined';

export const FakeBODLEvents = {
    cart: {
        addItem: () => {},
        removeItem: () => {},
        emit: () => {},
    },
    AddCartItemEvent: {
        CREATE: 'create_add_cart_item',
    },
    RemoveCartItemEvent: {
        CREATE: 'create_remove_cart_item',
    },
};

export const getEventId = () => uuidv4();

export const getBODLEvents = () => {
    if (isBODLEnabled()) {
        return window.bodlEvents;
    }

    return FakeBODLEvents;
};
