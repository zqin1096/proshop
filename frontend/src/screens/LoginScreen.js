import React, {useEffect, useState} from "react";
import {Link, Redirect} from 'react-router-dom';
import FormContainer from "../components/FormContainer";
import {Button, Form} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useDispatch, useSelector} from "react-redux";
import {clearError, login} from "../actions/authAction";
import Message from "../components/Message";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearError());
    }, []);

    const loginHandler = (event) => {
        event.preventDefault();
        dispatch(login(email, password));
    };

    if (auth.isAuthenticated) {
        return <Redirect to='/'/>
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {auth.error && <Message variant='danger'>{auth.error}</Message>}
            <Form onSubmit={loginHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(event) => {
                        setEmail(event.target.value);
                    }}/>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(event) => {
                        setPassword(event.target.value);
                    }}/>
                </Form.Group>
                <Button type='submit' variant='primary'>Sign In</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    <Link to='/register'>Don't have an account? Sign up</Link>
                </Col>
            </Row>
        </FormContainer>
    )

};

export default LoginScreen;