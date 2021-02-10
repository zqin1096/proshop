import {SET_PRODUCTS, SET_ERROR, PRODUCT_SET_LOADING, SET_PRODUCT, PRODUCT_CLEAR_ERROR} from "../actions/types";

const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null
};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case SET_PRODUCTS:
            return {
                ...state,
                loading: false,
                products: action.payload
            };
        case SET_PRODUCT:
            return {
                ...state,
                loading: false,
                product: action.payload
            }
        case SET_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case PRODUCT_CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};