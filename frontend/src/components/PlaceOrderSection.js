import React from "react";
import {useSelector} from "react-redux";
import {Image, ListGroup} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";

const PlaceOrderSection = () => {
    const cart = useSelector(state => state.cart);
    return (
        <>
            {cart.items.length > 0 &&
            <ListGroup variant='flush'>
                {cart.items.map((item) => {
                    return (
                        <ListGroup.Item key={item.id}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                </Col>
                                <Col>
                                    <Link to={`/product/${item.id}`}>
                                        {item.name}
                                    </Link>
                                </Col>
                                <Col md={4}>
                                    {item.quantity} x ${item.price} = ${item.quantity * item.price}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
            }
        </>
    );
};

export default PlaceOrderSection;