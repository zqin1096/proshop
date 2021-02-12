import React, {useEffect, useState} from "react";
import FormContainer from "../components/FormContainer";
import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {addShippingAddress, getShippingAddresses, removeShippingAddress} from "../actions/shippingAddressAction";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import {Redirect} from "react-router-dom";
import {states} from "../utils/states";

const ShippingScreen = () => {
    const {shippingAddresses} = useSelector(state => state.shippingAddress);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState(states[0].state);
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const dispatch = useDispatch();
    const [shipping, setShipping] = useState('');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const auth = useSelector(state => state.auth);

    const onShippingChange = (event) => {
        setShipping(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(addShippingAddress({
            address,
            city,
            state,
            postalCode,
            country
        }));
        setShow(false);
        setAddress('');
        setCity('');
        setState('');
        setPostalCode('');
        setCountry('');
    };

    const removeAddress = (id) => {
        dispatch(removeShippingAddress(id));
    };

    useEffect(() => {
        // The token is set in the request header in loadUser().
        if (auth && auth.user) {
            dispatch(getShippingAddresses());
        }
    }, [auth, auth.token]);

    if (!auth.isAuthenticated) {
        return <Redirect to='/login?redirect=shipping'/>;
    }

    return (
        <FormContainer>
            <h1>Shipping Address</h1>

            {shippingAddresses && shippingAddresses.length > 0 ?
                <FormControl component="fieldset" style={{marginBottom: '12px'}}>
                    <FormLabel component="legend">Choose a shipping address</FormLabel>
                    <RadioGroup aria-label="shipping" name="shipping" value={shipping} onChange={onShippingChange}>
                        {
                            shippingAddresses.map((shippingAddress) => {
                                return (
                                    <div style={{
                                        paddingLeft: '8px',
                                        paddingRight: '8px',
                                        background: shipping === shippingAddress._id ? '#fdf5ee' : '#ffffff',
                                        border: shipping === shippingAddress._id ? '1px solid #fbd8b4' : '#ffffff',
                                        borderRadius: '5px'
                                    }} key={shippingAddress._id}>
                                        <FormControlLabel style={{margin: 0}} value={shippingAddress._id}
                                                          control={<Radio color='primary'/>}
                                                          label={`${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}/>
                                        <Button style={{
                                            paddingTop: 0,
                                            paddingBottom: 0,
                                            paddingLeft: '8px',
                                            paddingRight: 0
                                        }} variant='link' onClick={() => {
                                            removeAddress(shippingAddress._id);
                                        }
                                        }>Remove</Button>
                                    </div>
                                )
                            })
                        }
                    </RadioGroup>
                </FormControl> : null
            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter a new shipping address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmit}>
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
                            Add address
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            {shippingAddresses && shippingAddresses.length > 0 &&
            <div>
                <Button style={{borderRadius: '5px', background: '#f5d587'}} variant='primary' disabled={!shipping}>
                    Use this address
                </Button>
            </div>
            }
            <div style={{marginTop: '12px'}}>
                <i className="fas fa-plus" onClick={handleShow}> Add a new address</i>
            </div>
        </FormContainer>
    )
};

export default ShippingScreen;