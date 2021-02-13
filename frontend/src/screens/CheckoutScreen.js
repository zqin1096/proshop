import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {Accordion, Button, Card} from "react-bootstrap";
import ShippingSection from "../components/ShippingSection";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {getShippingAddresses} from "../actions/shippingAddressAction";

const CheckoutScreen = () => {
    const {shippingAddresses} = useSelector(state => state.shippingAddress);

    const [shippingAddress, setShippingAddress] = useState('');
    const [key, setKey] = useState('0');
    const useAddress = (address) => {
        setShippingAddress((address));
    }

    const auth = useSelector(state => state.auth);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        // The token is set in the request header in loadUser().
        if (auth && auth.user) {
            dispatch(getShippingAddresses());
        }
    }, [auth, auth.token]);

    useEffect(() => {
        if (shippingAddresses) {
            if (shippingAddresses.length > 0) {
                const shippingAddress = shippingAddresses[0];
                setShippingAddress(`${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.postalCode}, ${shippingAddress.country}`)
            } else {
                setShippingAddress('');
            }
        }
    }, [shippingAddresses]);

    if (!auth.isAuthenticated) {
        return <Redirect to='/login?redirect=checkout'/>;
    }

    // If the cart is empty, avoid go to the shipping page.
    if (cart.items.length === 0) {
        return <Redirect to='/cart'/>;
    }

    return (
        <Accordion
            activeKey={key}
            onSelect={(eventKey) => {
                setKey(eventKey);
            }}>
            <Card>
                <Accordion.Toggle as={Button} variant='info' eventKey="0">
                    {key === '0' ?
                        <Row>
                            <Col md={4} className='text-left'>
                                Choose a shipping address
                            </Col>
                        </Row> :
                        <Row>
                            <Col md={4} className='text-left'>
                                Shipping address
                            </Col>
                            <Col md={8} className='text-left'>
                                {shippingAddress}
                            </Col>
                        </Row>
                    }
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <ShippingSection useAddress={useAddress} setKey={setKey} shippingAddresses={shippingAddresses}/>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Button} variant='info' eventKey="1">
                    Click me!
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )

};

export default CheckoutScreen;