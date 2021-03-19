import {
    ADMIN_CLEAR_ERROR, ADMIN_CLEAR_LOADING,
    ADMIN_CLEAR_USER,
    ADMIN_FAIL,
    ADMIN_SET_LOADING,
    ADMIN_SET_USER,
    ADMIN_SET_USERS,
    UPDATE_USER
} from "./types";
import axios from "axios";
import {getProducts} from "./productAction";

export const setLoading = () => {
    return {
        type: ADMIN_SET_LOADING
    };
};

export const clearLoading = () => {
    return {
        type: ADMIN_CLEAR_LOADING
    };
};

export const addProduct = (product) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading());
            // Upload the image first.
            const path = await axios.post('/api/upload', product.image, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Set the path of the image.
            product.image = path.data;
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            await axios.post('/api/products', product, config);
            dispatch(clearLoading());
            dispatch(getProducts());
        } catch (error) {
            dispatch({
                type: ADMIN_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    };
};

export const updateProduct = (product) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading());
            // When update a product, image is not required.
            if (product.image) {
                const path = await axios.post('/api/upload', product.image, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                product.image = path.data;
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            await axios.put(`/api/products/${product.id}`, product, config);
            dispatch(clearLoading());
            dispatch(getProducts());
        } catch (error) {
            dispatch({
                type: ADMIN_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    };
};

export const clearUser = () => {
    return {
        type: ADMIN_CLEAR_USER
    };
};

export const updateUser = (user, id) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading());
            // Bearer token is set in loadUser().
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const res = await axios.put(`/api/users/${id}`, user, config);
            dispatch({
                type: ADMIN_SET_USER,
                payload: res.data.user
            });
        } catch (error) {
            dispatch({
                type: ADMIN_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    };
};

export const getUserById = (id) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading());
            const res = await axios.get(`/api/users/${id}`);
            dispatch({
                type: ADMIN_SET_USER,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: ADMIN_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    }
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