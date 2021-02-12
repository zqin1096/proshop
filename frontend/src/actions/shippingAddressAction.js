import axios from "axios";
import {GET_SHIPPING_ADDRESSES} from "./types";

export const getShippingAddresses = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/users/profile/address');
            dispatch({
                type: GET_SHIPPING_ADDRESSES,
                payload: res.data.shippingAddresses
            });
        } catch (error) {

        }
    };
};

export const addShippingAddress = (address) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            await axios.post('/api/users/profile/address', address, config);
            dispatch(getShippingAddresses());
        } catch (error) {

        }
    };
};

export const removeShippingAddress = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete('/api/users/profile/address', {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    id: id
                }
            });
            dispatch(getShippingAddresses());
        } catch (error) {

        }
    }
}