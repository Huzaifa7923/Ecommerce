import React from 'react'
import { useParams } from 'react-router-dom'
// import products from '../../src/products'
import {Row,Col,Image,ListGroup,Card,Button, ListGroupItem, Form} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import { useState,useEffect } from 'react'
import Loader from '../components/Loader'
import { useGetProductDetailsQuery } from '../slices/productsApiSlice'
import Message from '../components/Message'
import { useDispatch } from 'react-redux'
import { addToCart } from '../slices/cartSlice'
import { useNavigate } from 'react-router-dom'

const ProductScreen = () => {

    const {id}=useParams();
    const [qty,setQty]=useState(1);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const {data:product,isLoading,error}=useGetProductDetailsQuery(id);

    let totalQty=0;

    if(!isLoading&&!error){
     totalQty=Number(product.countInStock);
     console.log("inside if ") 
    //  console.log(product.countInStock)
    }else{
        console.log("outside if ") 
        // console.log(++i);
    }
    const optionsArray=[];
   
    for(let i =0;i<totalQty;++i){
        optionsArray.push(i+1);
    }
    console.log(optionsArray);

    const qtyHandler =(e)=>{
        setQty(Number(e.target.value))
    }

    const addToCartHandler=()=>{
        dispatch(addToCart({...product,qty}))
        navigate('/')
    }
     return (
    <>
    <Link className='btn btn-light my-3' to='/'>
    Go Back
    </Link> 
    {isLoading? (<Loader/>):error? (<Message variant='danger'>{error?.data?.message || error.error }</Message>) :(<>
<Row>
<Col md={5}>
    <Image src={product.image} alt={product.name} fluid />
</Col>
<Col md={4}>
      <ListGroup variant='flush'>
        <ListGroupItem>
            <h3>{product.name}</h3>
        </ListGroupItem>
        <ListGroupItem>
            <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>
        </ListGroupItem>
        <ListGroupItem>Price : ${product.price}</ListGroupItem>
        <ListGroupItem>Description : {product.description}</ListGroupItem>
      </ListGroup>

      
</Col>
<Col md={3}>
    <Card>
        <ListGroup>
        <ListGroupItem>
            <Row>
                <Col>Price:</Col>
                <Col>
                <strong>${product.price}</strong>
                </Col>
            </Row>
        </ListGroupItem>

        <ListGroupItem>
            <Row>
                <Col>Status:</Col>
                <Col>
                <strong>{totalQty>0 ? 'In Stock':'Out Of Stock'}</strong>
                </Col>
            </Row>
        </ListGroupItem>
        {totalQty>0
        &&
        (<ListGroupItem>
            <Row>
                <Col>Qty: </Col>
                <Col>
                <Form.Control
                as="select"
                value={qty}
                onChange={qtyHandler}
                >
      {optionsArray.map((option) => (
        <option key={option} value={option}
        >
          {option}
        </option>
      ))}
        </Form.Control>
        </Col>
        </Row>
        </ListGroupItem>)}
        <ListGroupItem>
            <Button
            className='btn-block'
            type='button'
            disabled={totalQty===0}
            onClick={addToCartHandler}
            >Add to card</Button>
        </ListGroupItem>
        </ListGroup>
    </Card>
</Col>
</Row>       </>)}
    </>
  )
}

export default ProductScreen


