import React from 'react';
import Container from 'react-bootstrap/Container';
import {Nav, Navbar, NavDropdown} from "react-bootstrap";

const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand href="/">ProShop</Navbar.Brand>
                    {/*The aria-controls attribute is a 'relationship attribute' which denotes which elements in a page an interactive element or set of elements has control over and affects.*/}
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    {/*Collapses the content behind a button when the screen size decreases to a certain point.*/}
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {/*Check font awesome website*/}
                            <Nav.Link href="/cart"><i className='fas fa-shopping-cart'/> Cart</Nav.Link>
                            <Nav.Link href="/login"><i className='fas fa-user'/> Sign In</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;