import {AUTH_FAIL, AUTH_SUCCESS, LOAD_USER, AUTH_SET_LOADING, USER_LOGOUT, AUTH_CLEAR_ERROR} from "../actions/types";

const initialState = {
    loading: false,
    token: null,
    isAuthenticated: false,
    user: null,
    error: null
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                ...action.payload,
                isAuthenticated: true
            }
        case AUTH_FAIL:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: action.payload
            }
        case USER_LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        case LOAD_USER:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case AUTH_CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}