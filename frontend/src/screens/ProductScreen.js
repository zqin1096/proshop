import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import Rate from "../components/Rate";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Button, Card, Image, ListGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {clearError, getProduct} from "../actions/productAction";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = (props) => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    console.log(product);
    // All route props (match, location and history) are available.
    // A match object contains information about how a <Route path> matched the URL.
    useEffect(() => {
        // Clear the error if exists before sending the request.
        dispatch(clearError());
        dispatch(getProduct(props.match.params.id));
    }, [props.match.params.id]);

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>Go Back</Link>
            {!product.loading && product.error ?
                <Message variant='danger'>{product.error}</Message> : product.loading || !product.product ? <Loader/> :
                    <Row>
                        <Col md={6}>
                            <Image src={product.product.image} alt={product.product.name} fluid/>
                        </Col>
                        <Col md={3}>
                            {/*ListGroup: display a series of content.*/}
                            {/*flush: remove some borders and rounded corners to render list group items edge-to-edge in a parent container*/}
                            <ListGroup variant='flush'>
                                <ListGroup.Item><h3>{product.product.name}</h3></ListGroup.Item>
                                <ListGroup.Item>
                                    <Rate value={product.product.rating}
                                          text={`${product.product.numReviews} ${product.product.numReviews > 1 ? 'reviews' : 'review'}`}/>
                                </ListGroup.Item>
                                <ListGroup.Item>Price: ${product.product.price}</ListGroup.Item>
                                <ListGroup.Item>Description: {product.product.description}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col><strong>${product.product.price}</strong></Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>{product.product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {/*Create block level buttons—those that span the full width of a parent.*/}
                                        <Button
                                            className='btn-block'
                                            type='button'
                                            disabled={product.product.countInStock === 0}>
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
            }
        </>
    )
};

export default ProductScreen;