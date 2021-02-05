import React from "react";
import {Card} from "react-bootstrap";
import Rate from "./Rate";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const Product = (props) => {
    return (
        <Card className='my-3 p-3 rounded'>
            {/*Use Link instead of HTML <a> tag to avoid refreshing the page.*/}
            <Link to={`/product/${props.product._id}`}>
                {/*variant: defines image position inside the card.*/}
                <Card.Img src={props.product.image} variant='top'/>
            </Link>

            <Card.Body>
                <Link to={`/product/${props.product._id}`}>
                    <Card.Title as='div'><strong>{props.product.name}</strong></Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Rate value={props.product.rating}
                          text={`${props.product.numReviews} ${props.product.numReviews > 1 ? 'reviews' : 'review'}`}/>
                </Card.Text>
                <Card.Text as='h3'>${props.product.price}</Card.Text>
            </Card.Body>
        </Card>
    )
}

Product.propTypes = {
    product: PropTypes.object.isRequired
}

export default Product;