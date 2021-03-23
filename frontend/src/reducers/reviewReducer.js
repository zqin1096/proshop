import {
    REVIEW_CLEAR_STATE,
    REVIEW_CREATE_SUCCESS,
    REVIEW_FAIL,
    REVIEW_SET_LOADING,
    SET_IS_REVIEWED
} from "../actions/types";

const initialState = {
    loading: false,
    success: false,
    error: null,
    isReviewed: false
};

export const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case REVIEW_SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case REVIEW_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null
            };
        case REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            };
        case REVIEW_CLEAR_STATE:
            return {
                ...state,
                loading: false,
                success: false,
                error: null,
                isReviewed: false
            };
        case SET_IS_REVIEWED:
            return {
                ...state,
                loading: false,
                isReviewed: action.payload
            };
        default:
            return state;
    }
};

