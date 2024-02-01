import { Button, Col,ListGroupItem,Row } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import {Image} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCreateOrderMutation } from '../slices/ordersApiSlice'
import { Card } from 'react-bootstrap'
import {clearCartItems} from '../slices/cartSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const PlaceOrderScreen = () => {

    const cart=useSelector(state=>state.cart);
    const navigate=useNavigate();
    const dispatach=useDispatch();

    const [createOrder,{isLoading,error}]=useCreateOrderMutation();
    
    useEffect(()=>{
        if(!cart.shippingAddress.address){
            toast('Fill address first');
            navigate('/shipping')
        }else
        if(!cart.paymentMethod){
            toast('Add payment method first')
            navigate('/payment')
        }
    },[navigate,cart.shippingAddress.address,cart.paymentMethod])
    // console.log(cart);
    const ButtonHandler=async()=>{
        // console.log('Button Handler')
        try{
          const res=await createOrder({
            cartItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice:cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            totalPrice:cart.totalPrice
        }).unwrap();

        dispatach(clearCartItems());
        // console.log('ssssssssssss');
        navigate(`/order/${res._id}`)            
        }catch(err){
            toast.error(err)
        }
    }
  return (
    <>
    <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
    <Row>
        <Col md={8}>
            <Card>
        <ListGroup variant='flush'>
            <ListGroupItem>
                <h2>Shipping</h2>
                <p><b>Address:</b>{cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</p>
            </ListGroupItem>

            <ListGroupItem>
                <h2>Payment Method</h2>
                <p><b>Method:</b>{cart.paymentMethod}</p>
            </ListGroupItem>

            <ListGroupItem>
                <h2>Order Items</h2>
                <ListGroup>
                {
                    cart.cartItems.map((item)=>(
                        <ListGroupItem>
                            <Row>
                            <Col md={2}>
                            <Image
                             src={item.image}
                             alt={item.name}
                             fluid
                             rounded
                            />
                            </Col>
                           <Col>
                           <Link to={`/product/${item._id}`}>
                           {item.name}
                           </Link>
                           </Col>
                           <Col>
                           {`${item.qty}x$${item.price}=${item.qty*item.price}`}
                           </Col>
                        </Row>
                        </ListGroupItem>    
                    ))
                }
                </ListGroup>
            </ListGroupItem>
        </ListGroup>
        </Card>
        </Col>
        <Col md={4}>
            <Card>
            <ListGroup variant = 'flush'>
                <ListGroupItem>
                <h2>Order Summary</h2>
                </ListGroupItem>
                <ListGroupItem>
                    <Col>Items Price:</Col>
                    <Col>${cart.itemsPrice}</Col>
                </ListGroupItem>
                <ListGroupItem>
                    <Col>Shipping Price:</Col>
                    <Col>${cart.shippingPrice}</Col>
                </ListGroupItem>
                <ListGroupItem>
                    <Col>Tax:</Col>
                    <Col>${cart.taxPrice}</Col>
                </ListGroupItem>
                <ListGroupItem>
                    <Col>Total Price:</Col>
                    <Col>${cart.totalPrice}</Col>
                </ListGroupItem>
                <ListGroup>
                    {error &&(
                        <Message>{error.data.message}</Message>
                    )}
                </ListGroup>
              <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={ButtonHandler}
                >  
                    Place Order
                </Button>
            </ListGroup>
            </Card>
        </Col>
    </Row>
    </>
  )
}

export default PlaceOrderScreen