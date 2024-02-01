import React from 'react'
import { useSelector } from 'react-redux'
import { Col,Row,Table,Button} from 'react-bootstrap';
import Message from '../../components/Message';
import { FaEdit, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../../components/Loader';
import { useGetProductsQuery } from '../../slices/productsApiSlice';
import {useNavigate, useParams} from 'react-router-dom' 
import { useCreateProductMutation } from '../../slices/productsApiSlice';
import {toast} from 'react-toastify'
import { useDeleteProductMutation } from '../../slices/productsApiSlice';
import Paginate from '../../components/Paginate';


const ProductListScreen = () => {
  const navigate=useNavigate();

  const {pageNumber}=useParams();
  const {data,isLoading,error,refetch} =useGetProductsQuery({pageNumber});

  const [createProduct,{isLoading:loadingCreate}]=useCreateProductMutation();
  const [deleteProduct,{isLoading:loadingDelete}]=useDeleteProductMutation();

  const deleteHandler=async(id)=>{
    if(window.confirm('Are you sure you want to delete? ')){
      try{
      await deleteProduct(id);
      refetch();
      }catch(err){
        toast.error(err.error|| err?.data?.message)
      }
    }    
  }

  const createProductHandler=async()=>{
    if(window.confirm('Are you sure you want to create a new product? ')){
    try{
    await createProduct().unwrap();
    refetch();
    }catch(err){
      toast.error(err.error|| err?.data?.message)
    }
  }
  }
  
  const editHandler=(id)=>{
    navigate(`/admin/product/${id}/edit`)
  }

  return (
    <div>
      <Row className='align-items-center'>
        <Col>
        <h1>Products</h1>
        </Col>
        <Col className='text-end'>
      <Button className='my-3' onClick={createProductHandler}>
        <FaPlus/>Create Product
      </Button>
      </Col>
      </Row>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {
    isLoading ? <Loader/>:error ?   
    <Message variant='danger'>
      {error?.data?.message||error.error}
    </Message> :(
      <>
      <Table striped hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>Id</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
          </tr>
        </thead>
        <tbody>
          {data
          &&data.products 
          &&
          data.products.map((product)=>(
            <tr>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
              {/* <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-2'>
                        <FaEdit />
                      </Button>
                    </LinkContainer> */}
              <Button
              className='btn-sm'
              onClick={()=>editHandler(product._id)}>
                <FaEdit style={{color:'white'}}/>
              </Button>
                </td>
                <td>
              <Button
              variant='danger'
              className='btn-sm'
              onClick={()=>deleteHandler(product._id)}>
                <FaTrash style={{color:'white'}}/>
              </Button>
              </td>
            </tr>
          ))}
        </tbody>
        
        </Table>
       <Paginate pages={data.pages} page={data.page} isAdmin={true}/>
        </>
        )}
        {/* {data && } */}
    </div>
  )
}

export default ProductListScreen

