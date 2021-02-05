import React from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from 'react-bootstrap/Container';
import HomeScreen from "./screens/HomeScreen";
import {BrowserRouter, Route} from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";

const App = () => {
    return (
        // To use a router, just make sure it is rendered at the root of your element hierarchy. Typically you’ll wrap your top-level <App> element in a router.
        <BrowserRouter>
            <Header/>
            <main className='py-3'>
                <Container>
                    <Route path='/' component={HomeScreen} exact/>
                    <Route path='/product/:id' component={ProductScreen}/>
                </Container>
            </main>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
