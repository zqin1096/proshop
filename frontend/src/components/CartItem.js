import React, {useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Button, Form, Image, ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {removeProduct, updateQuantity} from "../actions/cartAction";
import {useDispatch} from "react-redux";

const CartItem = ({item}) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(item.quantity);
    const [show, setShow] = useState(false);
    return (<ListGroup.Item key={item.id}>
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
                    <Row className='align-items-center'>
                        <Col>
                            <Form.Control as='input' value={quantity}
                                          style={{padding: '4px'}}
                                          onFocus={() => {
                                              setShow(true);
                                          }}
                                          onChange={(event) => {
                                              const regex = /^[0-9\b]+$/;
                                              if (event.target.value === '' || regex.test(event.target.value)) {
                                                  setQuantity(event.target.value);
                                              }
                                          }}/>
                        </Col>
                        {show ?
                            <Col>
                                <Button variant="success" size="sm" style={{padding: '4px'}}
                                        disabled={quantity === ''}
                                        onClick={() => {
                                            setShow(false);
                                            console.log(quantity);
                                            if (Number(quantity) === 0) {
                                                console.log('enter1')
                                                dispatch(removeProduct(item.id));
                                            } else {
                                                console.log('enter2')
                                                dispatch(updateQuantity(item.id, quantity));
                                            }
                                        }}>
                                    Update
                                </Button>
                            </Col> : null
                        }
                    </Row>
                </Col>
                <Col md={2}>
                    ${item.price}
                </Col>
            </Row>
        </ListGroup.Item>
    )
};

export default CartItem;