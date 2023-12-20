import React from 'react'
import products from '../products'
import Product from '../components/Product'
import { Row,Col } from 'react-bootstrap'
import axios from 'axios'
import { useEffect,useState } from 'react'

const HomeScreen = () => {

  const [products,setProducts]=useState([]);

useEffect(()=>{
  const fetchProducts=async()=>{
    const response=await axios.get('/api/products');
    setProducts(response.data)
  }
  fetchProducts();
},[])
  return (
    <Row>
        {
            products.map((product)=>(
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                   <Product product={product}/>
                </Col>
            ))
        }
    </Row>
  )
}

export default HomeScreen