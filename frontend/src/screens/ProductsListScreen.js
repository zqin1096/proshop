import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearError} from "../actions/adminAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Button, Col, Row, Table} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {deleteProduct, getProducts} from "../actions/productAction";

const ProductsListScreen = () => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        // Clear the error if exists before sending the request.
        dispatch(clearError());
        dispatch(getProducts());
    }, []);

    // Only an admin can see this page.
    if (!auth.isAuthenticated || !auth.user.isAdmin) {
        return <Message variant='danger'>Not authorized</Message>
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={() => {

                    }}>
                        <i className='fas fa-plus'/>&nbsp;&nbsp;Add a product
                    </Button>
                </Col>
            </Row>
            {product.loading ?
                (<Loader/>) : product.error ? (<Message variant='danger'>{product.error}</Message>) :
                    (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {product.products.map((product) => {
                                return (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'/>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant='danger' className='btn-sm' onClick={() => {
                                                if (window.confirm('Are you sure to delete this product?')) {
                                                    dispatch(deleteProduct(product._id));
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

export default ProductsListScreen;