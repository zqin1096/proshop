import React, {useEffect, useState} from "react";
import FormContainer from "../components/FormContainer";
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    addShippingAddress,
    getShippingAddresses,
    removeShippingAddress,
    updateShippingAddress
} from "../actions/shippingAddressAction";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import {Redirect} from "react-router-dom";
import ShippingAddressModal from "../components/ShippingAddressModal";

const ShippingScreen = () => {
    const {shippingAddresses} = useSelector(state => state.shippingAddress);

    const dispatch = useDispatch();

    const [shipping, setShipping] = useState('');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [updateAddress, setUpdateAddress] = useState(null);
    const [updateShow, setUpdateShow] = useState(false);
    const handleUpdateClose = () => setUpdateShow(false);
    const handleUpdateShow = () => setUpdateShow(true);

    const auth = useSelector(state => state.auth);

    const cart = useSelector(state => state.cart);

    const onShippingChange = (event) => {
        setShipping(event.target.value);
    };

    const onNewAddressSubmit = (address, city, state, postalCode, country) => {
        dispatch(addShippingAddress({
            address,
            city,
            state,
            postalCode,
            country
        }));
    };

    const onUpdateAddressSubmit = (address, city, state, postalCode, country, id) => {
        dispatch(updateShippingAddress({
            id,
            address,
            city,
            state,
            postalCode,
            country
        }));
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

    // If the cart is empty, avoid go to the shipping page.
    if (cart.items.length === 0) {
        return <Redirect to='/cart'/>;
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
                                        <Button
                                            style={{
                                                paddingTop: 0,
                                                paddingBottom: 0,
                                                paddingLeft: '8px',
                                                paddingRight: '8px'
                                            }}
                                            variant='link'
                                            onClick={() => {
                                                setUpdateAddress(shippingAddress);
                                                setUpdateShow(true);
                                            }}>
                                            Edit address
                                        </Button>
                                        |
                                        <Button
                                            style={{
                                                paddingTop: 0,
                                                paddingBottom: 0,
                                                paddingLeft: '8px',
                                                paddingRight: 0
                                            }}
                                            variant='link'
                                            onClick={() => {
                                                removeAddress(shippingAddress._id);
                                            }}>
                                            Remove
                                        </Button>
                                    </div>
                                )
                            })
                        }
                    </RadioGroup>
                </FormControl> : null
            }

            <ShippingAddressModal
                title='Enter a new shipping address'
                buttonText='Add address'
                onSubmit={onNewAddressSubmit}
                show={show}
                onHide={handleClose}
            />
            <ShippingAddressModal
                shippingAddress={updateAddress}
                title='Update your shipping address'
                buttonText='Save changes'
                onSubmit={onUpdateAddressSubmit}
                show={updateShow}
                onHide={handleUpdateClose}
            />
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