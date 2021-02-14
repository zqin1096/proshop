import React, {useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {states} from "../utils/states";

const ShippingAddressModal = (props) => {

    // When add a new address, shippingAddress is null.
    const shippingAddress = props.shippingAddress;
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState(states[0].state);
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    useEffect(() => {
        if (shippingAddress) {
            setAddress(shippingAddress.address);
            setCity(shippingAddress.city);
            setState(shippingAddress.state);
            setPostalCode(shippingAddress.postalCode);
            setCountry(shippingAddress.country);
        }
    }, [shippingAddress]);

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(event) => {
                    event.preventDefault();
                    props.onSubmit(address, city, state, postalCode, country, shippingAddress ? shippingAddress._id : undefined);
                    setAddress('');
                    setCity('');
                    setState(states[0].state);
                    setPostalCode('');
                    setCountry('');
                    props.onHide();
                }}>
                    <Form.Group controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control type='text' placeholder='Enter address' value={address} required
                                      onChange={(event) => {
                                          setAddress(event.target.value);
                                      }}/>
                    </Form.Group>
                    <Form.Group controlId='city'>
                        <Form.Label>City</Form.Label>
                        <Form.Control type='text' placeholder='Enter city' value={city} required
                                      onChange={(event) => {
                                          setCity(event.target.value);
                                      }}/>
                    </Form.Group>
                    <Form.Group controlId="state">
                        <Form.Label>State</Form.Label>
                        <Form.Control as="select" value={state} onChange={(event) => {
                            setState(event.target.value);
                        }}>
                            {states.map((state) => {
                                return <option value={state.abbreviation}
                                               key={state.abbreviation}>{state.state}</option>
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='postalCode'>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control type='text' placeholder='Enter postal code' value={postalCode} required
                                      onChange={(event) => {
                                          setPostalCode(event.target.value);
                                      }}/>
                    </Form.Group>
                    <Form.Group controlId='country'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control type='text' placeholder='Enter country' value={country} required
                                      onChange={(event) => {
                                          setCountry(event.target.value);
                                      }}/>
                    </Form.Group>
                    <Button variant="primary" type='submit'>
                        {props.buttonText}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
};

export default ShippingAddressModal;