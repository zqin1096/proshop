import React from 'react';
import Container from 'react-bootstrap/Container';
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {useSelector, useDispatch} from "react-redux";
import {logout} from "../actions/authAction";
import {withRouter} from 'react-router-dom';

const Header = (props) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth);
    const logoutHandler = () => {
        dispatch(logout());
        // withRouter.
        props.history.push('/login');
    };
    return (
        <header>
            <Navbar bg="info" variant='dark' expand="lg" collapseOnSelect>
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
                            {auth.isAuthenticated && auth.user ?
                                (
                                    <NavDropdown id='username' title={auth.user.name}>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                ) :
                                (
                                    <LinkContainer to='/login'>
                                        <Nav.Link><i className='fas fa-user'/> Sign In</Nav.Link>
                                    </LinkContainer>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default withRouter(Header);