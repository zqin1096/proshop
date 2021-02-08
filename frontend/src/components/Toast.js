import React from "react";
import Col from "react-bootstrap/Col";
import {Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";

const Toast = (props) => {
    return (
        <Row className='align-items-center'>
            <Col md={6}>
                <Image src={props.product.image} alt={props.product.name} fluid/>
            </Col>
            <Col md={6}>
                Added to Cart
            </Col>
        </Row>
    )
};

export default Toast;