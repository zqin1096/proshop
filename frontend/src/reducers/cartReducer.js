import {ADD_PRODUCT, REMOVE_PRODUCT, UPDATE_QUANTITY} from "../actions/types";

const initialState = {
    items: []
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            // item is an object which contains the product's id and product's quantity.
            const product = action.payload;
            const exist = state.items.find((item) => {
                return item.id === product.id;
            });
            if (exist) {
                return {
                    ...state,
                    items: state.items.map((item) => {
                        if (item.id === product.id) {
                            return {
                                ...item,
                                quantity: Number(item.quantity) + Number(product.quantity)
                            }
                        } else {
                            return item;
                        }
                    })
                }
            } else {
                return {
                    ...state,
                    items: [...state.items, product]
                };
            }
        case UPDATE_QUANTITY:
            return {
                ...state,
                items: state.items.map((item) => {
                    if (item.id !== action.payload.id) {
                        return item;
                    } else {
                        return {
                            ...item,
                            quantity: Number(action.payload.quantity)
                        };
                    }
                })
            };
        case REMOVE_PRODUCT:
            return {
                ...state,
                items: state.items.filter((item) => {
                    return item.id !== action.payload;
                })
            }
        default:
            return state;
    }
};