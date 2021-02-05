import React, {useState, useEffect} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import axios from "axios";

const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    // This effect does not depend on any values from props or state, so it never needs to re-run.
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get('/api/products');
            setProducts(res.data);
        };
        fetchProducts();
    }, []);
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