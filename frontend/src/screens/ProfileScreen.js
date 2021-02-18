import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Message from "../components/Message";
import {Button, Form, Table} from "react-bootstrap";
import {clearError, updateUser} from "../actions/authAction";
import Loader from "../components/Loader";
import {getOrders} from "../actions/orderAction";
import {LinkContainer} from 'react-router-bootstrap';

const ProfileScreen = () => {
    const auth = useSelector(state => state.auth);
    const order = useSelector(state => state.order);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);
    useEffect(() => {
        dispatch(clearError());
        if (auth.user) {
            setName(auth.user.name);
            setEmail(auth.user.email);
        }
    }, [auth.user]);

    useEffect(() => {
        dispatch(getOrders());
    }, []);

    // Refresh.
    if (auth.token && !auth.user) {
        return <Loader/>
    }

    if (!auth.isAuthenticated && !auth.loading) {
        return <Redirect to='/login?redirect=profile'/>
    }
    const updateHandler = (event) => {
        setMessage(null);
        event.preventDefault();
        if (password !== confirm) {
            setMessage('Please make sure your passwords match');
        } else {
            dispatch(updateUser({
                name,
                email,
                password
            }));
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 2000)
            setPassword('');
            setConfirm('');
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {auth.error && <Message variant='danger'>{auth.error}</Message>}
                {show && !auth.error && <Message variant='success'>Profile Updated</Message>}
                {message && <Message variant='danger'>{message}</Message>}
                {auth.user ?
                    <Form onSubmit={updateHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' required placeholder='Enter name' value={name}
                                          onChange={(event) => {
                                              setName(event.target.value);
                                          }}/>
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email' required placeholder='Enter email' value={email}
                                          onChange={(event) => {
                                              setEmail(event.target.value);
                                          }}/>
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter password' value={password}
                                          onChange={(event) => {
                                              setPassword(event.target.value);
                                          }}/>
                        </Form.Group>
                        <Form.Group controlId='confirm'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password' placeholder='Confirm password' value={confirm}
                                          onChange={(event) => {
                                              setConfirm(event.target.value);
                                          }}/>
                        </Form.Group>
                        <Button type='submit' variant='primary'>Update</Button>
                    </Form> : null}
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {!order.loading && order.error ? <Message variant='danger'>{order.error}</Message> : order.loading ?
                    <Loader/> : order.orders.length > 0 ?
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Delivered</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {order.orders.map((order) => {
                                return (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>{order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                            <i className='fas fa-times' style={{color: 'red'}}/>
                                        )}</td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button className='btn-sm' variant='light'>Details</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table> : <Message variant='info'>No purchase history</Message>
                }
            </Col>
        </Row>
    );
};

export default ProfileScreen;