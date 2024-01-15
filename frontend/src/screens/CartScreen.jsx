import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { Row } from 'react-bootstrap'
import {Row,Col,Image,ListGroup,Card,Button, ListGroupItem, Form} from 'react-bootstrap'
import { addToCart } from '../slices/cartSlice'
import { FaTrash } from 'react-icons/fa'
import { removeItem } from '../slices/cartSlice'
import Message from '../components/Message';
import { useNavigate,Link } from 'react-router-dom'

export const CartScreen = () => {

    const navigate=useNavigate();
    const dispatch=useDispatch();

    const obj=useSelector(state=>state.cart)
    const products=obj.cartItems;

    const addToCartHandler=(product,qty)=>{
        dispatch(addToCart({...product,qty}))
    };

    const checkoutHandler=()=>{
        navigate('/payment')
    }
    const removeHandler=(id)=>{
        console.log("inside removeHandler")
        dispatch(removeItem(id));
    }
    return (
    <Row>
        <Col md={8}>
            <h1 style={{marginBottom:'20px'}}>Shopping Cart</h1>
            {products.length===0 ? (
            <Message>Your cart is empty <Link to='/'>Go back</Link>
            </Message>
            ):(
            <ListGroup>
           { products.map((product)=>(
                <ListGroupItem key={product._id}>
                    <Row>
                    <Col md={2}>
                    <Image src={product.image} alt='Not loading' fluid rounded></Image>
                    </Col>
                    <Col md={3}>
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </Col>
                    <Col md={2}>
                        ${product.price}
                    </Col>
                    <Col md={2}>
                        <Form.Control as='select'
                        value={product.qty}
                        onChange={(e)=>addToCartHandler(product,Number(e.target.value))}
            >
                {Array.from({ length: product.countInStock }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))} 
                    </Form.Control>
                    </Col>

                    <Col md={2}>
                        <Button type='button' variant='light' onClick={()=>removeHandler(product._id)}>
                        <FaTrash/>
                        </Button>
                    </Col>
                    </Row>
                    </ListGroupItem>
                    ))}
                    </ListGroup>
            )}
            </Col>

                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroupItem>
                                    <h2>
                                    Subtotal ({products.reduce((acc, item) => acc + item.qty, 0)}) items
                                    </h2>
                                </ListGroupItem>
                                
                                
             <ListGroupItem>
              <Button
                type='button'
                className='btn-block'
                disabled={products.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
                </Button>
             </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            
            </Row>
)
}