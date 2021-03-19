import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {Button, Form} from "react-bootstrap";
import {getUserById, updateUser} from "../actions/adminAction";

const UserEditScreen = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const admin = useSelector(state => state.admin);

    useEffect(() => {
        if (!admin.user || props.match.params.id !== admin.user._id) {
            dispatch(getUserById(props.match.params.id));
        } else {
            setName(admin.user.name);
            setEmail(admin.user.email);
            setIsAdmin(admin.user.isAdmin);
        }
    }, [admin.user, props.match.params.id]);

    const update = () => {
        dispatch(updateUser({
            name,
            email,
            isAdmin
        }, props.match.params.id));
        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 2000);
    }

    return (
        <>
            <Link to='/admin/users' className='btn btn-light my-3'>
                Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {!admin.loading && admin.error && <Message variant='danger'>{admin.error}</Message>}
                {!admin.loading && show && !admin.error && <Message variant='success'>Profile Updated</Message>}
                {
                    admin.loading || !admin.user ? <Loader/> : (
                        <Form onSubmit={update}>
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
                            <Form.Group controlId='isAdmin'>
                                <Form.Check
                                    type='checkbox'
                                    label='Is Admin'
                                    checked={isAdmin}
                                    onChange={(event) => {
                                        setIsAdmin(event.target.checked)
                                    }}/>
                            </Form.Group>
                            <Button type='submit' variant='primary'>
                                Update
                            </Button>
                        </Form>
                    )
                }
            </FormContainer>
        </>
    )
};

export default UserEditScreen;