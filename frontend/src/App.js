import React from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from 'react-bootstrap/Container';

const App = () => {
    return (
        <React.Fragment>
            <Header/>
            <main className='py-3'>
                <Container>
                    <h1>Welcome to ProShop</h1>
                </Container>
            </main>
            <Footer/>
        </React.Fragment>
    );
}

export default App;
