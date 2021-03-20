import {CLEAR_ORDER_STATE, ORDER_FAIL, ORDER_SET_LOADING, ORDER_SUCCESS, SET_USER_ORDERS} from "./types";
import axios from "axios";
import {clearCart} from "./cartAction";

export const createOrder = (order, paymentResult) => {
    return async (dispatch) => {
        try {
            // dispatch({
            //     type: ORDER_SET_LOADING
            // });
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const res = await axios.post('/api/orders', {
                order: order,
                paymentResult: paymentResult
            }, config);
            dispatch({
                type: ORDER_SUCCESS,
                payload: res.data
            });
            dispatch(clearCart());
            localStorage.removeItem('cart');
        } catch (error) {
            dispatch({
                type: ORDER_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    };
};

export const getOrder = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ORDER_SET_LOADING
            });
            const res = await axios.get(`/api/orders/${id}`);
            dispatch({
                type: ORDER_SUCCESS,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: ORDER_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    };
};

export const clearOrderState = () => {
    return {
        type: CLEAR_ORDER_STATE
    };
};

export const getOrders = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ORDER_SET_LOADING
            });
            const res = await axios.get('/api/orders');
            dispatch({
                type: SET_USER_ORDERS,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: ORDER_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    }
};