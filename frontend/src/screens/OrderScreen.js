import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearOrderState, getOrder} from "../actions/orderAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Button, Card, Container, Image, ListGroup, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";

const OrderScreen = (props) => {

    const orderId = props.match.params.id;
    const dispatch = useDispatch();
    const order = useSelector(state => state.order);

    const [date, setDate] = useState(null);

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    useEffect(() => {
        if (order.order) {
            setDate(new Date(order.order.createdAt));
        }
    }, [order.order])

    useEffect(() => {
        dispatch(clearOrderState());
        dispatch(getOrder(orderId));
    }, [orderId]);

    return !order.loading && order.error ?
        <Message variant='danger'>{order.error}</Message> : order.loading || !order.order || !date ? <Loader/> :
            <Container>
                <p className='h2'>Order Details</p>
                <p>
                    Ordered on {`${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
                    &nbsp;&nbsp;|&nbsp;
                    Order# {order.order._id}
                </p>
                <Card className='rounded mb-3'>
                    <Row>
                        <Col md={4}>
                            <Card.Body>
                                <Card.Title>Shipping Address</Card.Title>
                                <Card.Text>{order.order.user.name}</Card.Text>
                                <Card.Text>{order.order.shippingAddress.address}</Card.Text>
                                <Card.Text>{`${order.order.shippingAddress.city}, ${order.order.shippingAddress.state} ${order.order.shippingAddress.postalCode}`}</Card.Text>
                                <Card.Text>{order.order.shippingAddress.country}</Card.Text>
                            </Card.Body>
                        </Col>
                        <Col md={4}>
                            <Card.Body>
                                <Card.Title>Payment Method</Card.Title>
                                <Card.Text>{order.order.paymentMethod}</Card.Text>
                            </Card.Body>
                        </Col>
                        <Col md={4}>
                            <Card.Body>
                                <Card.Title>Order Summary</Card.Title>
                                <Row>
                                    <Col>
                                        Item(s) Subtotal:
                                    </Col>
                                    <Col className='text-right'>
                                        ${order.order.totalPrice - order.order.shippingPrice - order.order.taxPrice}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Shipping:
                                    </Col>
                                    <Col className='text-right'>
                                        ${order.order.shippingPrice}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Estimated tax to be collected:
                                    </Col>
                                    <Col className='text-right'>
                                        ${order.order.taxPrice}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{fontWeight: '900'}}>
                                        Grand Total:
                                    </Col>
                                    <Col className='text-right'>
                                        ${order.order.totalPrice}
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>

                {order.order.isDelivered ?
                    (<Message variant='success'>Delivered on {order.order.deliveredAt}</Message>) :
                    (<Message variant='danger'>Not Delivered</Message>)
                }
                <ListGroup variant='flush' className='mt-3'>
                    {order.order.orderItems.map((item) => {
                        return (
                            <Card key={item.id} className='rounded mb-1'>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Link to={`/product/${item.id}`}>
                                                {item.name}
                                            </Link>
                                        </Row>
                                        <Row>
                                            Quantity: {item.quantity}
                                        </Row>
                                        <Row style={{color: '#d8831c'}}>${item.price}</Row>
                                        <Row>
                                            <Button
                                                type='button'
                                                className='text-dark'
                                                style={{borderRadius: '5px', background: '#f5d587'}}>
                                                Buy it again
                                            </Button>
                                        </Row>
                                    </Col>
                                    <Col md={4}>
                                        <Button
                                            type='button'
                                            className='text-dark mt-2'
                                            style={{borderRadius: '5px', background: '#eef0f2'}}>
                                            Write a product review
                                        </Button>
                                    </Col>
                                </Row>
                            </Card>
                        )
                    })}
                </ListGroup>
            </Container>
};

export default OrderScreen;