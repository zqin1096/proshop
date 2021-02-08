import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {productReducer} from "./reducers/productReducer";
import {cartReducer} from "./reducers/cartReducer";


const reducer = combineReducers({
    product: productReducer,
    cart: cartReducer
});
const initialState = {
    // Get the cart from localStorage.
    cart: {
        items: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    }
};

const middlewares = [thunk];

// https://github.com/zalmoxisus/redux-devtools-extension.
// Check section 1.3.
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));
export default store;