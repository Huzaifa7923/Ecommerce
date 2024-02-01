import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Row,Col, Button } from 'react-bootstrap'
import { ListGroup,ListGroupItem, } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useGetOrderByIdQuery} from '../slices/ordersApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {Image} from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import { useDeliverOrderMutation } from '../slices/ordersApiSlice'
import {toast} from 'react-toastify'

import {PayPalButtons,usePayPalScriptReducer} from '@paypal/react-paypal-js'
import {usePayOrderMutation,useGetPaypalClientIdQuery} from '../slices/ordersApiSlice'

const OrderScreen = () => {

    const {id}=useParams();
    const {userInfo}=useSelector(state=>state.auth);


    const {data:order,refetch,isLoading,error} = useGetOrderByIdQuery(id);
    const [deliver,{isLoading:loadingForDeliver}]=useDeliverOrderMutation();

    const [payOrder,{isLoading:loadingPay}]=usePayOrderMutation();
    const [{isPending},paypalDispatch]=usePayPalScriptReducer();
    const {data:paypal,isLoading:loadingPayPal,error:errorPaypal}=useGetPaypalClientIdQuery();

    useEffect(()=>{
        if(!errorPaypal && !loadingPayPal && paypal.clientId){
            const loadPaypalScript=async()=>{
                paypalDispatch({
                    type:'resetOptions',
                    value:{
                        'client-id': paypal.clientId,
                        currency: 'USD',
                    }
                })
                paypalDispatch({type:'setLoadingStatus',value:'pending'})
            }
            if(order && !order.isPaid){
                if(!window.paypal){
                    loadPaypalScript();
                }
            }
        }
    },[errorPaypal,loadingPayPal,order,paypal,paypalDispatch]);

      async function onApproveTest() {
    await payOrder({ id, details: { payer: {} } });
    refetch();

    toast.success('Order is paid');
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ id, details });
        refetch();
        toast.success('Order is paid');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((id) => {
        return id;
      });
  }

    const buttonHandler=async()=>{
        try{
        await deliver(id);
        refetch();
        toast.success('Delivered')
        }catch(err){
        }
    }

  return (
    isLoading?(<Loader/>):error?(
        <Message variant='danger'>{error.data.message}</Message>
    ):(
        <Row>
            <Col md={8}>
                <h1>Order : {id}</h1>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <h2>Shipping</h2>
                        <p>
                        <strong>Name: </strong>{order.user.name}
                        </p>
                        <p>
                        <strong>Email: </strong>
                        <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                        </p>
                        <p>
                        <strong>Address: </strong>{order.shippingAddress.city} , {order.shippingAddress.postalCode},{order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? (
                        <Message variant='success'>
                        Delivered on {order.deliveredAt.substr(0,10)}
                        </Message>
                        ) : (
                        <Message variant='danger'>Not Delivered</Message>
                        )}
                    </ListGroupItem>

                    <ListGroupItem>
                        <h2>Payment Method</h2>
                        <p><strong>Method:</strong>{order.paymentMethod}</p>
                        {order.isPaid ? (
                        <Message variant='success'>
                        Paid on {order.paidAt.substr(0,10)}
                        </Message>
                        ) : (
                        <Message variant='danger'>Not Paid</Message>
                        )}
                    </ListGroupItem>
                    <ListGroupItem>
                        <h2>Order Item</h2>
                        {
                        order.orderItems.map((item)=>(
                            <ListGroup>
                                <Row>
                                    <Col md={1}>
                                        <Image 
                                        src={item.image}
                                        alt={item.name}
                                        fluid
                                        rounded
                                        >
                                        </Image>
                                    </Col>
                                    <Col>

                                   <Link to={`/product/${item._id}`}>
                                   {item.name}
                                   </Link>
                                    </Col>
                                    <Col>
                                    {item.qty}x${item.price}=${item.qty*item.price}
                                    </Col>
                                </Row>
                            </ListGroup>
                        )) 
                        }
                    </ListGroupItem>
                </ListGroup>
            </Col>
 
            <Col md={4}>
                <Card>
                    <ListGroup>
                    <ListGroupItem>
                    <h2>Order Summary</h2>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>Items</Col>
                            <Col>${order.itemsPrice}</Col>
                        </Row>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>${order.shippingPrice}</Col>
                        </Row>
                        <Row>
                            <Col>Tax</Col>
                            <Col>${order.taxPrice}</Col>
                        </Row>
                        <Row>
                            <Col>Total</Col>
                            <Col>${order.totalPrice}</Col>
                        </Row></ListGroupItem>

                        
                        {
                            !order.isPaid && (
                                <ListGroupItem>
                                    {loadingPay && <Loader/>}
                                    {
                                        isPending?<Loader/>:(
                                            <div>
                                            <Button onClick={onApproveTest} style={{marginBottom:'10px'}}>Test </Button>
                                            <div>
                                                <PayPalButtons
                                                createOrder={createOrder}
                                                onApprove={onApprove}
                                                onError={onError}>
                                                </PayPalButtons>
                                            </div> 
                                            </div>
                                        )
                                    }
                                </ListGroupItem>
                            )
                        }
                        {loadingForDeliver && <Loader/>}
                        {
                            userInfo.isAdmin && order.isPaid && !order.isDelivered &&               <ListGroupItem>
                            <Button onClick={buttonHandler}>
                                Mark as Delivered
                            </Button>
                            
                            </ListGroupItem>
                        }
                        
                    
                    </ListGroup>
                </Card>
            </Col>
            </Row>
    )
  )
}

export default OrderScreen