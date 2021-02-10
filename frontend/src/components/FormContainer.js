import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const FormContainer = (props) => {
    return (
        <Container>
            {/*Center the items.*/}
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                    {props.children}
                </Col>
            </Row>
        </Container>
    )
};

export default FormContainer;