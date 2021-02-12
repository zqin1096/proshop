import {GET_SHIPPING_ADDRESSES} from "../actions/types";

const initialState = {
    shippingAddresses: null
};

export const shippingAddressReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SHIPPING_ADDRESSES:
            return {
                ...state,
                shippingAddresses: action.payload
            };
        default:
            return state;
    }
};