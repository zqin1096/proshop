import React from "react";
import products from "../products";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";

const HomeScreen = () => {
    return (
        <React.Fragment>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => {
                    return (
                        <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                            <Product product={product}/>
                        </Col>
                    )
                })}
            </Row>
        </React.Fragment>
    )
}

export default HomeScreen;