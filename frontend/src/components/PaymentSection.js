import React, {useState} from "react";
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import {Button} from "react-bootstrap";

const PaymentSection = (props) => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal or Credit Card');

    return (
        <>
            <FormControl component="fieldset" style={{marginBottom: '12px'}}>
                <RadioGroup aria-label="payment" name="payment" value={paymentMethod} onChange={(event) => {
                    setPaymentMethod(event.target.value);

                }}>
                    <div style={{
                        paddingLeft: '8px',
                        paddingRight: '8px',
                        background: paymentMethod === 'PayPal' ? '#fdf5ee' : '#ffffff',
                        border: paymentMethod === 'PayPal' ? '1px solid #fbd8b4' : '#ffffff',
                        borderRadius: '5px'
                    }}>
                        <FormControlLabel style={{margin: 0}} value='PayPal or Credit Card'
                                          control={<Radio color='primary'/>}
                                          label='PayPal or Credit Card'/>
                    </div>
                </RadioGroup>
            </FormControl>
            <div>
                <Button
                    className='text-dark'
                    style={{borderRadius: '5px', background: '#f5d587'}}
                    variant='primary'
                    disabled={!paymentMethod}
                    onClick={() => {
                        props.usePaymentMethod(paymentMethod);
                    }}
                >
                    Use this payment method
                </Button>
            </div>
        </>
    )
};

export default PaymentSection;