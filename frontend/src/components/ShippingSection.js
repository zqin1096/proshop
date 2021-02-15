import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {
    addShippingAddress,
    removeShippingAddress,
    updateShippingAddress
} from "../actions/shippingAddressAction";
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import ShippingAddressModal from "./ShippingAddressModal";

const ShippingSection = (props) => {
    const dispatch = useDispatch();
    // All shipping addresses of the logged-in user.
    const shippingAddresses = props.shippingAddresses;

    // The id of the selected shipping address.
    const [shipping, setShipping] = useState('');

    // Used for modal that adds a new shipping address.
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Used for modal that edit an existing shipping address.
    const [updateAddress, setUpdateAddress] = useState(null);
    const [updateShow, setUpdateShow] = useState(false);
    const handleUpdateClose = () => setUpdateShow(false);
    // const handleUpdateShow = () => setUpdateShow(true);

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

    // Set default shipping address.
    useEffect(() => {
        if (shippingAddresses) {
            setShipping(shippingAddresses.length > 0 ? shippingAddresses[0]._id : '');
        }
    }, [shippingAddresses]);

    return (
        <React.Fragment>
            {shippingAddresses && shippingAddresses.length > 0 ?
                <FormControl component="fieldset" style={{marginBottom: '12px'}}>
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
                <Button
                    className='text-dark'
                    style={{borderRadius: '5px', background: '#f5d587'}}
                    variant='primary'
                    disabled={!shipping}
                    onClick={() => {
                        const shippingAddress = shippingAddresses.find((shippingAddress) => {
                            return shippingAddress._id === shipping;
                        })
                        props.useAddress(`${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.postalCode}, ${shippingAddress.country}`);
                    }}
                >
                    Use this address
                </Button>
            </div>
            }
            <div style={{marginTop: '12px'}}>
                <i className="fas fa-plus" onClick={handleShow}> Add a new address</i>
            </div>
        </React.Fragment>
    )
};

export default ShippingSection;