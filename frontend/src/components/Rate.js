import React from "react";
import Rating from '@material-ui/lab/Rating';
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import {OverlayTrigger, Popover} from "react-bootstrap";

const Rate = (props) => {
    return (
        <Container fluid className='my-2'>
            <Row>
                <OverlayTrigger
                    trigger={['hover', 'focus']}
                    placement='top'
                    overlay={
                        <Popover id='popover-rating'>
                            <Popover.Content>
                                {props.value}
                            </Popover.Content>
                        </Popover>
                    }>
                    <span><Rating value={props.value} precision={0.1} readOnly={true} size='small'
                                  className='mr-2'/></span>
                </OverlayTrigger>
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