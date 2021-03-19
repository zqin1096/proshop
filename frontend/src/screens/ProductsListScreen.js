import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addProduct, clearError, updateProduct} from "../actions/adminAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Button, Col, Row, Table} from "react-bootstrap";
import {deleteProduct, getProducts} from "../actions/productAction";
import ProductEditModal from "../components/ProductEditModal";

const ProductsListScreen = () => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const auth = useSelector(state => state.auth);

    const [addProductShow, setAddProductShow] = useState(false);
    const [editProductShow, setEditProductShow] = useState(false);
    const [editProduct, setEditProduct] = useState(null);

    const onAddProductSubmit = (name, image, brand, category, description, price, countInStock) => {
        dispatch(addProduct({
            name,
            image,
            brand,
            category,
            description,
            price,
            countInStock
        }));
    };

    const onEditProductSubmit = (name, image, brand, category, description, price, countInStock, id) => {
        dispatch(updateProduct({
            id,
            name,
            image,
            brand,
            category,
            description,
            price,
            countInStock
        }));
    };

    useEffect(() => {
        // Clear the error if exists before sending the request.
        dispatch(clearError());
        dispatch(getProducts());
    }, []);

    if ((localStorage.getItem('token') && !auth.user) || product.loading) {
        return <Loader/>;
    }

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
                        setAddProductShow(true);
                    }}>
                        <i className='fas fa-plus'/>&nbsp;&nbsp;Add a product
                    </Button>
                </Col>
            </Row>
            {product.error ? (<Message variant='danger'>{product.error}</Message>) :
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
                                    <td>${(Math.round(product.price * 100) / 100).toFixed(2)}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <Button variant='light' className='btn-sm' onClick={() => {
                                            setEditProductShow(true);
                                            setEditProduct(product);
                                        }}>
                                            <i className='fas fa-edit'/>
                                        </Button>
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
            <ProductEditModal
                title='Add a product'
                buttonText='Save new product'
                onSubmit={onAddProductSubmit}
                show={addProductShow}
                onHide={() => {
                    setAddProductShow(false);
                }}
            />
            <ProductEditModal
                product={editProduct}
                title='Edit product'
                buttonText='Save changes'
                onSubmit={onEditProductSubmit}
                show={editProductShow}
                onHide={() => {
                    setEditProductShow(false);
                }}
            />
        </>
    )
};

export default ProductsListScreen;