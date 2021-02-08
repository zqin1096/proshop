import React from "react";
import {useSelector, useDispatch} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Message from "../components/Message";
import {Link} from "react-router-dom";
import {Button, Card, Form, Image, ListGroup} from "react-bootstrap";
import {removeProduct, updateQuantity} from "../actions/cartAction";

const CartScreen = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const total = cart.items.reduce((accumulator, item) => Number(accumulator) + Number(item.quantity), 0);
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cart.items.length === 0 ? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message> :
                    (
                        <ListGroup variant='flush'>
                            {cart.items.map((item) => {
                                return (
                                    <ListGroup.Item key={item.id}>
                                        <Row className='align-items-center'>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/product/${item.id}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={2}>
                                                <Button type='button' variant='light' onClick={() => {
                                                    dispatch(removeProduct(item.id));
                                                }}>
                                                    <i className="far fa-trash-alt fa-lg"/> &nbsp;&nbsp;Remove
                                                </Button>
                                            </Col>
                                            <Col md={3}>
                                                <Form.Control as='select' value={item.quantity} onChange={(event) => {
                                                    dispatch(updateQuantity(item.id, event.target.value));
                                                }}>
                                                    {[...Array(item.countInStock).keys()].map((key) => {
                                                        return <option key={key + 1} value={key + 1}>{key + 1}</option>
                                                    })}
                                                </Form.Control>
                                            </Col>
                                            <Col md={2}>
                                                ${item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )
                            })}
                        </ListGroup>
                    )
                }
            </Col>
            {cart.items.length > 0 ?
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Card.Title>Cart subtotal
                                    ({total}) {total > 1 ? 'items' : 'item'}:
                                    ${cart.items.reduce((accumulator, item) => Number(accumulator) + Number(item.quantity) * Number(item.price), 0).toFixed(2)}
                                </Card.Title>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={cart.items.length === 0}
                                        onClick={() => {
                                            console.log('Checkout');
                                        }}>
                                    Proceed to Checkout
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col> : null
            }
        </Row>
    );
};

export default CartScreen;