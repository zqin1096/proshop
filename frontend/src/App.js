import React from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from 'react-bootstrap/Container';
import HomeScreen from "./screens/HomeScreen";
import {BrowserRouter, Route} from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import {ToastContainer} from "react-toastify";
import LoginScreen from "./screens/LoginScreen";
import {useDispatch} from "react-redux";
import {loadUser} from "./actions/authAction";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import OrderScreen from "./screens/OrderScreen";
import UsersListScreen from "./screens/UsersListScreen";
import UserEditScreen from "./screens/UserEditScreen";

const App = () => {
    const dispatch = useDispatch();
    // Load the corresponding user if a token exists.
    if (localStorage.token) {
        dispatch(loadUser());
    }
    return (
        // To use a router, just make sure it is rendered at the root of your element hierarchy. Typically you’ll wrap your top-level <App> element in a router.
        <BrowserRouter>
            <Header/>
            <main className='py-3'>
                <Container>
                    {/*All render methods will be passed the same three route props: match, location, history.*/}
                    <Route path='/login' component={LoginScreen} exact/>
                    <Route path='/checkout' component={CheckoutScreen} exact/>
                    <Route path='/order/:id' component={OrderScreen} exact/>
                    <Route path='/register' component={RegisterScreen} exact/>
                    <Route path='/profile' component={ProfileScreen} exact/>
                    <Route path='/product/:id' component={ProductScreen} exact/>
                    <Route path='/cart' component={CartScreen} exact/>
                    <Route path='/admin/users' component={UsersListScreen} exact/>
                    <Route path='/admin/user/:id/edit' component={UserEditScreen} exact/>
                    <Route path='/' component={HomeScreen} exact/>
                </Container>
            </main>
            <Footer/>
            {/*Need to render the ToastContainer once in the application tree.*/}
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover/>
        </BrowserRouter>
    );
}

export default App;
