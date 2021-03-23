import {
    REVIEW_CLEAR_STATE,
    REVIEW_CREATE_SUCCESS,
    REVIEW_FAIL,
    REVIEW_SET_LOADING,
    SET_ERROR,
    SET_IS_REVIEWED
} from "./types";
import axios from "axios";

export const setLoading = () => {
    return {
        type: REVIEW_SET_LOADING
    };
};

export const clearState = () => {
    return {
        type: REVIEW_CLEAR_STATE
    };
};

export const isReviewed = (id) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading());
            const res = await axios.get(`/api/products/${id}/is-reviewed`);
            dispatch({
                type: SET_IS_REVIEWED,
                payload: res.data.isReviewed
            });
        } catch (error) {
            dispatch({
                type: REVIEW_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    };
};

export const createReview = (review, id) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading());
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            await axios.post(`/api/products/${id}/reviews`, review, config);
            dispatch({
                type: REVIEW_CREATE_SUCCESS
            });
        } catch (error) {
            dispatch({
                type: REVIEW_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    };
};