import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {clearError, getProduct} from "../actions/productAction";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {Alert, Button, Form, Image, ListGroup} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Rating} from "@material-ui/lab";
import {clearState, createReview, isReviewed} from "../actions/reviewAction";

const ReviewScreen = (props) => {
    const auth = useSelector(state => state.auth);
    const product = useSelector(state => state.product);
    const review = useSelector(state => state.review);
    const dispatch = useDispatch();

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const [ratingError, setRatingError] = useState(null);
    const [commentError, setCommentError] = useState(null);

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

    useEffect(() => {
        if (review.success) {
            dispatch(clearState());
            props.history.push(`/product/${props.match.params.id}`);
        }
    }, [review.success]);

    useEffect(() => {
        if (review.isReviewed) {
            setTimeout(() => {
                dispatch(clearState());
                props.history.push(`/product/${props.match.params.id}`);
            }, 3000);
        }
    }, [review.isReviewed]);

    if ((localStorage.getItem('token') && !auth.user) || product.loading) {
        return <Loader/>;
    }

    if (!auth.isAuthenticated) {
        return <Redirect to={`/login?redirect=product/${props.match.params.id}/create-review`}/>;
    }


    return (
        <>
            {review.isReviewed ?
                <Alert variant='warning'>
                    {`You have reviewed this product and will be redirected to http://localhost:3000/product/${props.match.params.id} in a moment`}
                </Alert> : !product.loading && product.error ?
                    <Message variant='danger'>{product.error}</Message> :
                    (
                        <Form onSubmit={(event) => {
                            event.preventDefault();
                            if (rating === 0) {
                                setRatingError('Please select a star rating');
                            } else {
                                setRatingError(null);
                            }
                            if (comment.trim().length === 0) {
                                setCommentError('Please enter your review');
                            } else {
                                setCommentError(null);
                            }
                            if (rating !== 0 && comment.trim().length !== 0) {
                                dispatch(createReview({
                                    rating,
                                    comment
                                }, props.match.params.id));
                                setRating(0);
                                setComment('');
                            }
                        }}>
                            {review.error && <Message variant='danger'>{review.error}</Message>}
                            <p className='h3'>Create Review</p>
                            <ListGroup variant='flush'>
                                <ListGroup.Item style={{paddingLeft: 0, paddingRight: 0}}>
                                    <Row className='align-items-center h-100'>
                                        <Col md={2}>
                                            <Image src={product.product.image} alt={product.product.name} fluid
                                                   rounded/>
                                        </Col>
                                        <Col md={10}>
                                            <p>{product.product.name}</p>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item style={{paddingLeft: 0, paddingRight: 0}}>
                                    <p className='h4'>Overall rating</p>
                                    <Rating
                                        name='rating'
                                        value={rating}
                                        onChange={(event, newValue) => {
                                            setRating(newValue);
                                        }}
                                    />
                                    {ratingError && <Message variant='danger'>{ratingError}</Message>}
                                </ListGroup.Item>
                                <ListGroup.Item style={{paddingLeft: 0, paddingRight: 0}}>
                                    <p className='h4'>Add a written review</p>
                                    <Form.Control
                                        style={{
                                            padding: '4px',
                                            border: '1px solid #d9d1d1',
                                            borderRadius: '4px',
                                            height: '15vh'
                                        }}
                                        className='mb-3'
                                        as='textarea'
                                        placeholder='What did you like or dislike? What did you use this product for?'
                                        value={comment}
                                        onChange={(event) => {
                                            setComment(event.target.value);
                                        }}
                                    />
                                    {commentError && <Message variant='danger'>{commentError}</Message>}
                                </ListGroup.Item>
                            </ListGroup>
                            <Button
                                variant="primary" type='submit'>
                                Submit
                            </Button>
                        </Form>
                    )
            }
        </>
    )
};

export default ReviewScreen;