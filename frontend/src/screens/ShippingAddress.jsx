import { addShippingAddress } from "../slices/cartSlice"
import FormContainer from '../components/FormContainer'
import { Form,Row,Col } from "react-bootstrap"
import {useSelector} from 'react-redux'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import {Button} from "react-bootstrap"
import CheckoutSteps from "../components/CheckoutSteps"

const ShippingAddress = () => {

    const {shippingAddress}=useSelector(state=>state.cart);

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode||'')
    const [country, setCountry] = useState(shippingAddress.country || '');

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const formHandler=(e)=>{
        e.preventDefault();
        dispatch(addShippingAddress({address,city,postalCode,country}))
        navigate('/payment')
    }

  return (

    <FormContainer>
    <CheckoutSteps step1 step2/>
        <h1>Sign In</h1>
        <Form onSubmit={formHandler}>
            <Form.Group className='my-2' controlId='email'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter Address'
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
                >
                </Form.Control>

            </Form.Group>
            <Form.Group className='my-2' controlId='email'>
                <Form.Label>City</Form.Label>
                <Form.Control
                type='text'
                placeholder='City'
                value={city}
                onChange={(e)=>setCity(e.target.value)}
                >
                </Form.Control>

            </Form.Group>
            <Form.Group className='my-2' controlId='email'>
                <Form.Label>Postal code</Form.Label>
                <Form.Control
                type='number'
                placeholder='Postal Code'
                value={postalCode}
                onChange={(e)=>setPostalCode(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='email'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                type='text'
                placeholder='Country'
                value={country}
                onChange={(e)=>setCountry(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>

    </FormContainer>
  )
}

export default ShippingAddress