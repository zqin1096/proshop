import {ORDER_FAIL, ORDER_SET_LOADING, ORDER_SUCCESS} from "./types";
import axios from "axios";

export const createOrder = (order) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ORDER_SET_LOADING
            });
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const res = await axios.post('/api/orders', order, config);
            dispatch({
                type: ORDER_SUCCESS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: ORDER_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    };
};