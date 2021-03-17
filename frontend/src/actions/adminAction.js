import {ADMIN_CLEAR_ERROR, ADMIN_FAIL, ADMIN_SET_LOADING, ADMIN_SET_USERS} from "./types";
import axios from "axios";

export const setLoading = () => {
    return {
        type: ADMIN_SET_LOADING
    };
};


export const getUsers = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading());
            const res = await axios.get('/api/users');
            dispatch({
                type: ADMIN_SET_USERS,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: ADMIN_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    };
};

export const clearError = () => {
    return {
        type: ADMIN_CLEAR_ERROR
    };
};

export const deleteUser = (id) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading());
            await axios.delete(`/api/users/${id}`);
            dispatch(getUsers());
        } catch (error) {
            dispatch({
                type: ADMIN_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    }
};