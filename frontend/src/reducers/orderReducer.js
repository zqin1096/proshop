import {CLEAR_ORDER_STATE, ORDER_FAIL, ORDER_SET_LOADING, ORDER_SUCCESS, SET_USER_ORDERS} from "../actions/types";

const initialState = {
    loading: false,
    error: null,
    order: null,
    orders: []
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload
            };
        case ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                orders: [],
                order: null
            };
        case CLEAR_ORDER_STATE:
            return {
                ...state,
                loading: false,
                error: null,
                order: null,
                orders: []
            };
        case SET_USER_ORDERS:
            return {
                ...state,
                loading: false,
                error: null,
                orders: action.payload
            };
        default:
            return state;
    }
};