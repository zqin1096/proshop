import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Table} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {LinkContainer} from "react-router-bootstrap";
import {clearError, getAllOrders} from "../actions/adminAction";

const OrdersListScreen = () => {
    const dispatch = useDispatch();
    const admin = useSelector(state => state.admin);
    useEffect(() => {
        dispatch(clearError());
        dispatch(getAllOrders());
    }, []);
    return (
        <>
            <h1>Orders</h1>
            {!admin.loading && admin.error ?
                <Message variant='danger'>{admin.error}</Message> : admin.loading || !admin.orders ? <Loader/> :
                    (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>TOTAL PRICE</th>
                                <th>DELIVERED</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {admin.orders.map((order) => {
                                return (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user.name}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>
                                            {order.isDelivered ? (
                                                order.deliveredAt.substring(0, 10)
                                            ) : (
                                                <i className='fas fa-times' style={{color: 'red'}}/>
                                            )}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button variant='light' className='btn-sm'>
                                                    Detail
                                                </Button>
                                            </LinkContainer>
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

export default OrdersListScreen;