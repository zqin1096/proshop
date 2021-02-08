import {ADD_PRODUCT, REMOVE_PRODUCT, UPDATE_QUANTITY} from "./types";

export const addProduct = (product, quantity) => {
    // getState is a function which can be called to get the entire state.
    return async (dispatch, getState) => {
        dispatch({
            type: ADD_PRODUCT,
            payload: {
                id: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                quantity: Number(quantity)
            }
        });
        // Save the cart in the localStorage.
        localStorage.setItem('cart', JSON.stringify(getState().cart.items));
    };
};

export const updateQuantity = (id, quantity) => {
    return async (dispatch, getState) => {
        dispatch({
            type: UPDATE_QUANTITY,
            payload: {
                id: id,
                quantity: Number(quantity)
            }
        });
        // Update the cart in localStorage.
        localStorage.setItem('cart', JSON.stringify(getState().cart.items));
    }
};

export const removeProduct = (id) => {
    return async (dispatch, getState) => {
        dispatch({
            type: REMOVE_PRODUCT,
            payload: id
        });
        localStorage.setItem('cart', JSON.stringify(getState().cart.items));
    };
};