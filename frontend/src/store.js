import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {productReducer} from "./reducers/productReducer";
import {cartReducer} from "./reducers/cartReducer";
import {authReducer} from "./reducers/authReducer";
import {shippingAddressReducer} from "./reducers/shippingAddressReducer";
import {orderReducer} from "./reducers/orderReducer";
import {adminReducer} from "./reducers/adminReducer";
import {reviewReducer} from "./reducers/reviewReducer";

const reducer = combineReducers({
    product: productReducer,
    cart: cartReducer,
    auth: authReducer,
    shippingAddress: shippingAddressReducer,
    order: orderReducer,
    admin: adminReducer,
    review: reviewReducer
});
const initialState = {
    // Get the cart from localStorage.
    cart: {
        items: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    },
    auth: {
        token: localStorage.getItem('token')
    }
};

const middlewares = [thunk];

// https://github.com/zalmoxisus/redux-devtools-extension.
// Check section 1.3.
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));
export default store;