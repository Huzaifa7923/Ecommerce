import React, { useEffect, useState } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addPaymentMethod } from '../slices/cartSlice'
import { useDispatch } from 'react-redux'
import { Form,Col } from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

const PaymentScreen = () => {

    const navigate=useNavigate();
    const dispatch=useDispatch();

    const {shippingAddress}=useSelector(state=>state.cart);

    useEffect(()=>{
        if(!shippingAddress)
        navigate('/shipping')
    },[shippingAddress,navigate])

    const [paymentMethod,setPaymentMethod]=useState('Paypal');

    const formHandler=(e)=>{
        e.preventDefault();
        dispatch(addPaymentMethod(paymentMethod));
        navigate('/placeOrder');
    }
    return (
        <FormContainer>
          <CheckoutSteps step1 step2 step3 />
          <h1>Payment Method</h1>
          <Form onSubmit={formHandler}>
            <Form.Group>
              <Form.Label as='legend'>Select Method</Form.Label>
              <Col>
                <Form.Check
                  className='my-2'
                  type='radio'
                  label='PayPal or Credit Card'
                  id='PayPal'
                  name='paymentMethod'
                  value='PayPal'
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Col>
            </Form.Group>
    
            <Button type='submit' variant='primary'>
              Continue
            </Button>
          </Form>
        </FormContainer>
      );
}

export default PaymentScreen