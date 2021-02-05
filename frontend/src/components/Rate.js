import React from "react";
import Rating from '@material-ui/lab/Rating';
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";

const Rate = (props) => {
    return (
        <Container fluid className='my-2'>
            <Row>
                <Rating value={props.value} precision={0.1} readOnly={true} size='small' className='mr-2'/>
                <span>{props.text ? props.text : ''}</span>
            </Row>
        </Container>
    )
}

Rate.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
}

export default Rate;