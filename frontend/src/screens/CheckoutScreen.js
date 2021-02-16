import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {Accordion, Button, Card, ListGroup} from "react-bootstrap";
import ShippingSection from "../components/ShippingSection";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {getShippingAddresses} from "../actions/shippingAddressAction";
import PaymentSection from "../components/PaymentSection";
import PlaceOrderSection from "../components/PlaceOrderSection";
import {createOrder} from "../actions/orderAction";
import Message from "../components/Message";

const CheckoutScreen = () => {
    // All shipping addresses of the logged-in user.
    const {shippingAddresses} = useSelector(state => state.shippingAddress);

    const [shippingAddress, setShippingAddress] = useState('');
    const [shippingAddressId, setShippingAddressId] = useState('');

    // Ideally, the payment methods are stored in the database.
    const [paymentMethod, setPaymentMethod] = useState('PayPal or Credit Card');

    // Active key that corresponds to the currently expanded card.
    const [key, setKey] = useState('0');

    // Called when the "use this address" button is clicked.
    const useAddress = (address, addressId) => {
        setShippingAddress(address);
        setShippingAddressId(addressId);
        setKey('1');
    };

    // Called when the "use this payment method" button is clicked.
    const usePaymentMethod = (payment) => {
        setPaymentMethod(payment);
        setKey('2');
    };

    const auth = useSelector(state => state.auth);
    const cart = useSelector(state => state.cart);
    const order = useSelector(state => state.order);
    const dispatch = useDispatch();

    // Calculate prices.
    const itemsPrice = (Math.round(cart.items.reduce((accumulator, item) => Number(accumulator) + Number(item.price) * Number(item.quantity), 0) * 100) / 100).toFixed(2);
    const shippingPrice = (Math.round(itemsPrice * 0.02 * 100) / 100).toFixed(2);
    const taxPrice = (Math.round(Number(0.15 * itemsPrice) * 100) / 100).toFixed(2);
    const totalPrice = (Math.round((Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)) * 100) / 100).toFixed(2);

    useEffect(() => {
        // The token is set in the request header in loadUser().
        if (auth && auth.user) {
            dispatch(getShippingAddresses());
        }
    }, [auth, auth.token]);

    // Set default shipping address.
    useEffect(() => {
        if (shippingAddresses) {
            if (shippingAddresses.length > 0) {
                const shippingAddress = shippingAddresses[0];
                setShippingAddress(`${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.postalCode}, ${shippingAddress.country}`);
                setShippingAddressId(shippingAddress._id);
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
    if (key == null) {
        if (shippingAddress === '') {
            setKey('0');
        } else if (paymentMethod === '') {
            setKey('1');
        } else {
            setKey('2');
        }
    }

    if (!order.loading && !order.error && order.order) {
        return <Redirect to={`/order/${order.order._id}`}/>
    }

    return (
        <Row>
            <Col md={8}>
                <Accordion
                    activeKey={key}
                    onSelect={(eventKey) => {
                        setKey(eventKey);
                    }}>
                    <Card>
                        <Accordion.Toggle as={Button} variant='info' eventKey="0" onClick={() => {

                        }}>
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
                                <ShippingSection useAddress={useAddress} shippingAddresses={shippingAddresses}/>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Button} variant='info' eventKey="1" disabled={shippingAddress === ''}>
                            {key === '1' ?
                                <Row>
                                    <Col md={4} className='text-left'>
                                        Choose a payment method
                                    </Col>
                                </Row> :
                                <Row>
                                    <Col md={4} className='text-left'>
                                        Payment method
                                    </Col>
                                    <Col md={8} className='text-left'>
                                        {paymentMethod}
                                    </Col>
                                </Row>
                            }
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <PaymentSection usePaymentMethod={usePaymentMethod}/>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Button} variant='info' eventKey="2"
                                          disabled={shippingAddress === '' || paymentMethod === ''}>
                            {key === '2' ?
                                <Row>
                                    <Col md={4} className='text-left'>
                                        Review items and shipping
                                    </Col>
                                </Row> :
                                <Row>
                                    <Col md={4} className='text-left'>
                                        Items and shipping
                                    </Col>
                                    <Col md={8} className='text-left'>

                                    </Col>
                                </Row>
                            }
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                <PlaceOrderSection/>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <p className='h4'>Order Summary</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items:</Col>
                                <Col className='text-right'>${itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col className='text-right'>${shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Estimated tax to be collected:</Col>
                                <Col className='text-right'>${taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Order total:</Col>
                                <Col className='text-right'>${totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {order.error &&
                        <ListGroup.Item>
                            <Message variant='danger'>{order.error}</Message>
                        </ListGroup.Item>
                        }
                        <ListGroup.Item>
                            <Button
                                disabled={shippingAddress === '' || paymentMethod === ''}
                                type='button'
                                className='btn-block text-dark'
                                style={{borderRadius: '5px', background: '#f5d587'}}
                                onClick={() => {
                                    if (key === '0') {
                                        setKey('1');
                                    } else if (key === '1') {
                                        setKey('2');
                                    } else if (key === '2') {
                                        dispatch(createOrder({
                                            orderItems: cart.items,
                                            shippingAddress: shippingAddressId,
                                            paymentMethod: paymentMethod,
                                            shippingPrice: shippingPrice,
                                            taxPrice: taxPrice,
                                            totalPrice: totalPrice
                                        }));
                                    }
                                }}
                            >
                                {key === '0' ? 'Use this address' :
                                    key === '1' ? 'Use this payment method' :
                                        key === '2' ? 'Place your order' : null}
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )

};

export default CheckoutScreen;