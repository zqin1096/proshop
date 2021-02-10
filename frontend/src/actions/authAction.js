import {AUTH_FAIL, AUTH_SUCCESS, LOAD_USER, AUTH_SET_LOADING, USER_LOGOUT, AUTH_CLEAR_ERROR} from "./types";
import axios from "axios";

export const setLoading = () => {
    return {
        type: AUTH_SET_LOADING
    };
};

export const loadUser = () => {
    return async (dispatch) => {
        if (localStorage.token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.token;
        }
        try {
            const res = await axios.get('/api/users/profile');
            dispatch({
                type: LOAD_USER,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: AUTH_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }
};

export const login = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading());
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const res = await axios.post('/api/users/login', {
                email: email,
                password: password
            }, config);
            dispatch({
                type: AUTH_SUCCESS,
                payload: res.data
            });
            // Store (only) the token in the localStorage.
            localStorage.setItem('token', res.data.token);
            dispatch(loadUser());
        } catch (error) {
            dispatch({
                type: AUTH_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    };
};

export const register = (name, email, password) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading());
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const res = await axios.post('/api/users/', {
                name,
                email,
                password
            }, config);
            dispatch({
                type: AUTH_SUCCESS,
                payload: res.data
            });
            localStorage.setItem('token', res.data.token);
            dispatch(loadUser());
        } catch (error) {
            dispatch({
                type: AUTH_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    };
};

export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem('token');
        dispatch({
            type: USER_LOGOUT
        });
    };
};

export const clearError = () => {
    return {
        type: AUTH_CLEAR_ERROR
    };
};