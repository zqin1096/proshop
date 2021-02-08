import React from 'react';
import Container from 'react-bootstrap/Container';
import {Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {useSelector} from "react-redux";

const Header = () => {
    const cart = useSelector(state => state.cart);
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </LinkContainer>
                    {/*The aria-controls attribute is a 'relationship attribute' which denotes which elements in a page an interactive element or set of elements has control over and affects.*/}
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    {/*Collapses the content behind a button when the screen size decreases to a certain point.*/}
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {/*Check font awesome website*/}
                            <LinkContainer to='/cart'>
                                <Nav.Link><i className='fas fa-shopping-cart'/> {cart.items.length}</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/login'>
                                <Nav.Link><i className='fas fa-user'/> Sign In</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;