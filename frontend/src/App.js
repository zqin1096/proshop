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
                    <Route path='/login' component={LoginScreen}/>
                    <Route path='/register' component={RegisterScreen}/>
                    <Route path='/product/:id' component={ProductScreen}/>
                    <Route path='/cart' component={CartScreen}/>
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
