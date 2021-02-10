import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Message from "../components/Message";
import {Button, Form} from "react-bootstrap";
import {clearError, updateUser} from "../actions/authAction";
import Loader from "../components/Loader";

const ProfileScreen = () => {
    const auth = useSelector(state => state.auth);
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

    if (!auth.user) {
        return <Loader/>
    }

    if (!auth.isAuthenticated && !auth.loading) {
        return <Redirect to='/login'/>
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
            </Col>
        </Row>
    );

};

export default ProfileScreen;