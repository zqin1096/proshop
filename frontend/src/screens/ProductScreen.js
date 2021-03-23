import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Rate from "../components/Rate";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Alert, Button, Card, Form, Image, ListGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {clearError, getProduct} from "../actions/productAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {addProduct} from "../actions/cartAction";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from "../components/Toast";
import {LinkContainer} from 'react-router-bootstrap';
import {isReviewed} from "../actions/reviewAction";

const ProductScreen = (props) => {
    const [quantity, setQuantity] = useState('1');
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const auth = useSelector(state => state.auth);
    const review = useSelector(state => state.review);
    // All route props (match, location and history) are available.
    // A match object contains information about how a <Route path> matched the URL.
    useEffect(() => {
        // Clear the error if exists before sending the request.
        dispatch(clearError());
        dispatch(getProduct(props.match.params.id));
    }, [props.match.params.id]);

    useEffect(() => {
        if (auth.user) {
            dispatch(isReviewed(props.match.params.id));
        }
    }, [auth.user]);

    const addToCart = () => {
        toast(
            <Toast product={product.product}/>
        );
        dispatch(addProduct(product.product, quantity));
    };

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>Go Back</Link>
            {!product.loading && product.error ?
                <Message variant='danger'>{product.error}</Message> : product.loading || !product.product ?
                    <Loader/> : (
                        <>
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
                                            {product.product.countInStock > 0 ?
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col className='align-self-center'>Quantity:</Col>
                                                        <Col>
                                                            <Form.Control as='input' value={quantity}
                                                                          onChange={(event => {
                                                                              const regex = /^[0-9\b]+$/;
                                                                              if (event.target.value === '' || regex.test(event.target.value))
                                                                                  setQuantity(event.target.value);
                                                                          })}/>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item> : null
                                            }
                                            <ListGroup.Item>
                                                {/*Create block level buttons—those that span the full width of a parent.*/}
                                                <Button
                                                    onClick={addToCart}
                                                    className='btn-block'
                                                    type='button'
                                                    disabled={product.product.countInStock === 0 || quantity === '' || Number(quantity) === 0}>
                                                    Add To Cart
                                                </Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                            <hr className="mt-2 mb-3"/>
                            <Row>
                                <Col md={4}>
                                    <p className='h3'>Review this product</p>
                                    <p>Share your thoughts with other customers</p>
                                    {review.isReviewed ?
                                        <Alert variant='warning'>You have reviewed this product</Alert> :
                                        <LinkContainer to={`/product/${product.product._id}/create-review`}
                                                       style={{borderRadius: '5px', background: '#eef0f2'}}>
                                            <Button
                                                type='button'
                                                className='text-dark mt-2'>
                                                Write a customer review
                                            </Button>
                                        </LinkContainer>
                                    }
                                </Col>
                                <Col md={8}>
                                    <p className='h3'>Customer reviews</p>
                                    {product.product.reviews.length === 0 &&
                                    <Message>There are no customer reviews yet.</Message>}
                                    <ListGroup variant='flush'>
                                        {product.product.reviews.map((review) => {
                                            return (
                                                <ListGroup.Item key={review._id} style={{paddingLeft: '8px'}}>
                                                    <strong>{review.user.name}</strong>
                                                    <Rate value={review.rating}/>
                                                    <p>Reviewed on {review.updatedAt.substring(0, 10)}</p>
                                                    <p>{review.comment}</p>
                                                </ListGroup.Item>
                                            )
                                        })}
                                    </ListGroup>
                                </Col>
                            </Row>
                        </>
                    )
            }
        </>
    )
};

export default ProductScreen;