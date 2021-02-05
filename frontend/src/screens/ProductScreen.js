import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Rate from "../components/Rate";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Button, Card, Image, ListGroup} from "react-bootstrap";
import axios from "axios";

const ProductScreen = (props) => {
    // All route props (match, location and history) are available.
    // A match object contains information about how a <Route path> matched the URL.
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axios.get(`/api/products/${props.match.params.id}`);
            setProduct(res.data);
            setLoading(false);
        };
        fetchProduct();
    }, [props.match.params.id]);

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>Go Back</Link>
            {loading ? <div>loading</div> :
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid/>
                    </Col>
                    <Col md={3}>
                        {/*ListGroup: display a series of content.*/}
                        {/*flush: remove some borders and rounded corners to render list group items edge-to-edge in a parent container*/}
                        <ListGroup variant='flush'>
                            <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                            <ListGroup.Item>
                                <Rate value={product.rating}
                                      text={`${product.numReviews} ${product.numReviews > 1 ? 'reviews' : 'review'}`}/>
                            </ListGroup.Item>
                            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col><strong>${product.price}</strong></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {/*Create block level buttons—those that span the full width of a parent.*/}
                                    <Button
                                        className='btn-block'
                                        type='button'
                                        disabled={product.countInStock === 0}>
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