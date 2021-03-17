import {ADMIN_FAIL, ADMIN_SET_USERS, ADMIN_SET_LOADING, ADMIN_CLEAR_ERROR} from "../actions/types";

const initialState = {
    loading: false,
    users: null,
    error: null
};

export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case ADMIN_SET_USERS:
            return {
                ...state,
                loading: false,
                users: action.payload
            };
        case ADMIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ADMIN_CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};