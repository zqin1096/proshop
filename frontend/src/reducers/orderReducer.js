import {CLEAR_ORDER_STATE, ORDER_FAIL, ORDER_SET_LOADING, ORDER_SUCCESS} from "../actions/types";

const initialState = {
    loading: false,
    error: null,
    order: null,
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
                error: action.payload
            };
        case CLEAR_ORDER_STATE:
            return {
                ...state,
                loading: false,
                error: null,
                order: null
            };
        default:
            return state;
    }
};