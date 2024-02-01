import React from 'react'
import { useParams } from 'react-router-dom'
// import products from '../../src/products'
import {Row,Col,Image,ListGroup,Card,Button, ListGroupItem, Form, FormGroup, FormLabel, FormControl, Toast} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import { useState,useEffect } from 'react'
import Loader from '../components/Loader'
import { useGetProductDetailsQuery } from '../slices/productsApiSlice'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../slices/cartSlice'
import { useNavigate } from 'react-router-dom'
import {useCreateProductReviewMutation} from '../slices/productsApiSlice'
import {toast} from 'react-toastify'
import Meta from '../components/Meta'

const ProductScreen = () => {

    const {id}=useParams()
    const [qty,setQty]=useState(1);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const {userInfo}=useSelector((state)=>state.auth)

    const {data:product,isLoading,error,refetch}=useGetProductDetailsQuery(id);
    const [createReview,{isLoading:loadingProductReview}]=useCreateProductReviewMutation();

    const [comment,setComment]=useState('');
    const [rating,setRating]=useState();

    let totalQty=0;

    if(!isLoading&&!error){
     totalQty=Number(product.countInStock);
    //  console.log("inside if ") 
    //  console.log(product.countInStock)
    }else{
        // console.log("outside if ") 
        // console.log(++i);
    }
    const optionsArray=[];
   
    for(let i =0;i<totalQty;++i){
        optionsArray.push(i+1);
    }
    // console.log(optionsArray);

    const qtyHandler =(e)=>{
        setQty(Number(e.target.value))
    }

    const addToCartHandler=()=>{
        dispatch(addToCart({...product,qty}))
        navigate('/')
    }

    const submitHandler=async(e)=>{
        e.preventDefault();
        // console.log('handler')
        // console.log(id)
        try{
        await createReview({
            id,
            rating,
            comment
        }).unwrap();
        refetch();
        setComment('')
        setRating(0)
        toast.success('Review created successfully')
    }catch(err){
        toast.error(err?.data?.message || err.error);
    }
    }
     return (
    <>
    <Link className='btn btn-light my-3' to='/'>
    Go Back
    </Link> 
    {isLoading? (<Loader/>):error? (<Message variant='danger'>{error?.data?.message || error.error }</Message>) :(<>
    <Meta title={product.name}></Meta>
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
            >Add to card
            </Button>
        </ListGroupItem>
        </ListGroup>
        </Card>
        </Col>
    </Row>
        <Row className='review'>
            <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant='flush'>
                    {
                        product.reviews.map((review)=>(
                            <ListGroupItem>
                                <strong>{review.name}</strong>
                                <Rating value={review.rating}/>
                                <p>{review.createdAt.substring(0,10)}</p>
                                <p>{review.comment}</p>
                            </ListGroupItem>
                        ))
                    }
                    <ListGroupItem>
                        <h2>Write a customer Review</h2>
                        {loadingProductReview && <Loader/>}
                        {
                            userInfo ? (
                            <Form onSubmit={submitHandler}>
                                <FormGroup className='my-2' controlId='rating'>
                                    <FormLabel>Rating</FormLabel>
                                    <FormControl
                                    as='select'
                                    required
                                    value={rating}
                                    onChange={(e)=>setRating(e.target.value)}>
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                                    </FormControl>
                                </FormGroup>
                                <FormGroup className='my-2' controlId='comment'>
                                    <FormLabel>Comment</FormLabel>
                                    <FormControl 
                                    as='textarea'
                                    rows='3'
                                    required
                                    value={comment}
                                    onChange={(e)=>setComment(e.target.value)}
                                    >
                                    </FormControl>
                                    <Button
                                    disabled={loadingProductReview}
                                        type='submit'
                                        variant='primary'>
                                            Submit
                                    </Button>
                                    
                                </FormGroup>
                            </Form>):(<Message>
                                Please <Link to='/login'>sign in</Link> to write a review
                            </Message>)
                        }
                    </ListGroupItem>
                </ListGroup>
            </Col>
        </Row>
</>)}
</>
  )
}

export default ProductScreen


