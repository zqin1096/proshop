import React, {useEffect, useState} from "react";
import {Link, Redirect} from 'react-router-dom';
import FormContainer from "../components/FormContainer";
import {Button, Form} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useDispatch, useSelector} from "react-redux";
import {clearError, register} from "../actions/authAction";
import Message from "../components/Message";

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [message, setMessage] = useState(null);

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearError());
    }, []);

    const registerHandler = (event) => {
        setMessage(null);
        event.preventDefault();
        if (password !== confirm) {
            setMessage('Please make sure your passwords match');
        } else {
            dispatch(register(name, email, password));
        }
    };

    if (auth.isAuthenticated) {
        return <Redirect to='/'/>
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {auth.error && <Message variant='danger'>{auth.error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            <Form onSubmit={registerHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' required placeholder='Enter name' value={name} onChange={(event) => {
                        setName(event.target.value);
                    }}/>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' required placeholder='Enter email' value={email} onChange={(event) => {
                        setEmail(event.target.value);
                    }}/>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' required placeholder='Enter password' value={password}
                                  onChange={(event) => {
                                      setPassword(event.target.value);
                                  }}/>
                </Form.Group>
                <Form.Group controlId='confirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' required placeholder='Confirm password' value={confirm}
                                  onChange={(event) => {
                                      setConfirm(event.target.value);
                                  }}/>
                </Form.Group>
                <Button type='submit' variant='primary'>Register</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    <Link to='/login'>Already have an account? Log in</Link>
                </Col>
            </Row>
        </FormContainer>
    )

};

export default RegisterScreen;