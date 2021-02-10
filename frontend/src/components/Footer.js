import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'

const Footer = () => {
    return (
        <Container>
            <Row>
                <Col className='text-center py-3'>
                    Copyright &copy; ProShop
                </Col>
            </Row>
        </Container>
    )
}

export default Footer;