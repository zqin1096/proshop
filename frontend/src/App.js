import React from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from 'react-bootstrap/Container';
import HomeScreen from "./screens/HomeScreen";

const App = () => {
    return (
        <React.Fragment>
            <Header/>
            <main className='py-3'>
                <Container>
                    <HomeScreen/>
                </Container>
            </main>
            <Footer/>
        </React.Fragment>
    );
}

export default App;
