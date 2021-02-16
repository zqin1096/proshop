import React from "react";
import {useDispatch, useSelector} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Message from "../components/Message";
import {Link} from "react-router-dom";
import {Button, Card, ListGroup} from "react-bootstrap";
import CartItem from "../components/CartItem";
import {clearOrderState} from "../actions/orderAction";

const CartScreen = (props) => {
    const cart = useSelector(state => state.cart);
    const total = cart.items.reduce((accumulator, item) => Number(accumulator) + Number(item.quantity), 0);
    const dispatch = useDispatch();
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cart.items.length === 0 ? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message> :
                    (
                        <ListGroup variant='flush'>
                            {cart.items.map((item) => {
                                return (
                                    <CartItem key={item.id} item={item}/>
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
                                            // Need to clear the order state. Otherwise, it would go to the order's detail page.
                                            dispatch(clearOrderState());
                                            props.history.push('/login?redirect=checkout');
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