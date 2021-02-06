import {CLEAR_ERROR, SET_ERROR, SET_LOADING, SET_PRODUCT, SET_PRODUCTS} from "./types";
import axios from "axios";


export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};

export const getProducts = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading());
            const res = await axios.get('/api/products');
            dispatch({
                type: SET_PRODUCTS,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: SET_ERROR,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    };
};

export const getProduct = (id) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading());
            const res = await axios.get(`/api/products/${id}`);
            dispatch({
                type: SET_PRODUCT,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: SET_ERROR,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    };
};

export const clearError = () => {
    return {
        type: CLEAR_ERROR
    };
};