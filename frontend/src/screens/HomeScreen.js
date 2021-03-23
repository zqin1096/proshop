import React, {useEffect} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import {clearError, getProducts} from "../actions/productAction";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = (props) => {
    const keyword = props.match.params.keyword;

    const dispatch = useDispatch();
    // Get the "product" state.
    const product = useSelector(state => state.product);
    // This effect does not depend on any values from props or state, so it never needs to re-run.
    useEffect(() => {
        // Clear the error if exists before sending the request.
        dispatch(clearError());
        dispatch(getProducts(keyword));
    }, [keyword]);

    return (
        <>
            <h1>Latest Products</h1>
            {product.loading ?
                (<Loader/>) : product.error ? (<Message variant='danger'>{product.error}</Message>) :
                    <Row>
                        {product.products.map((product) => {
                            return (
                                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                                    <Product product={product}/>
                                </Col>
                            )
                        })}
                    </Row>
            }
        </>
    )
}

export default HomeScreen;