import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearError, deleteUser, getUsers} from "../actions/adminAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Button, Table} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';

const UsersListScreen = () => {
    const dispatch = useDispatch();
    const admin = useSelector(state => state.admin);
    useSelector(state => state.auth);
    useEffect(() => {
        dispatch(clearError());
        dispatch(getUsers());
    }, []);

    return (
        <>
            <h1>Users</h1>
            {!admin.loading && admin.error ?
                <Message variant='danger'>{admin.error}</Message> : admin.loading || !admin.users ? <Loader/> :
                    (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {admin.users.map((user) => {
                                return (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                        <td>
                                            {user.isAdmin ? (
                                                <i className='fas fa-check' style={{color: 'green'}}/>
                                            ) : (
                                                <i className='fas fa-times' style={{color: 'red'}}/>
                                            )}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'/>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant='danger' className='btn-sm' onClick={() => {
                                                if (window.confirm('Are you sure to delete this customer?')) {
                                                    dispatch(deleteUser(user._id));
                                                }
                                            }}>
                                                <i className='fas fa-trash'/>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                    )
            }
        </>
    )
};

export default UsersListScreen;