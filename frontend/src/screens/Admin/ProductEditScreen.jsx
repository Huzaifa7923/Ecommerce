import React, { useEffect, useState } from 'react'
import { Form,Button,FormControl,FormLabel,FormGroup } from 'react-bootstrap'
import FormContainer from '../../components/FormContainer'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductDetailsQuery, useUploadProductImageMutation } from '../../slices/productsApiSlice'
import Loader from '../../components/Loader'
import { useUpdateProductMutation } from '../../slices/productsApiSlice'
import { toast } from 'react-toastify'


const ProductEditScreen = () => {

    const {id}=useParams();
    const navigate=useNavigate();

    const {data:product,isLoading,refetch}=useGetProductDetailsQuery(id);

    const [updateProduct,{isLoading:loadingupdate}]=useUpdateProductMutation();

    const [name,setName]=useState('')
    const [price,setPrice]=useState(0)
    const [brand,setBrand]=useState('')
    const [countInStock,setCountInStock]=useState()
    const [category,setCategory]=useState('')
    const [description,setDescription]=useState('')

    const [image,setImage]=useState()
    const [uploadProductImage,{isLoading:loadingUpload}]=useUploadProductImageMutation();


    useEffect(()=>{
        if(product){
        setName(product.name)
        setPrice(product.price)
        setBrand(product.brand)
        setImage(product.image)
        setCountInStock(product.countInStock)
        setDescription(product.description)
        setCategory(product.category)
        }
    },[product])

    const uploadFileHandler=async(e)=>{
      const formData=new FormData();
      formData.append('image',e.target.files[0])
      
      try{
        const res=await uploadProductImage(formData).unwrap();
        toast.success(res.message);
        // console.log(res);
        setImage(res.image);
      }catch(err){
        toast.error(err?.data?.message || err.error);
      }
    }


    const formHandler=async(e)=>{
        e.preventDefault();
        try{
        await updateProduct({
        id,name,price,image,brand,countInStock,category,description
        }).unwrap();
        toast.success('Product updated ')
        refetch()
        navigate('/admin/productlist')
    }catch(err){
        toast.error(err?.data?.message || err.error);
    }
    }
    
  return (
        isLoading ? (<Loader/>) : (
        <FormContainer>
            <Form onSubmit={formHandler}>
            <FormGroup controlId='name' className='my-2'>
              <FormLabel>Name</FormLabel>
              <FormControl
              type='text'
              placeholder='Product name'
              value={name}
              onChange={(e)=>setName(e.target.value)}>
              </FormControl>
            </FormGroup>
        
            <FormGroup className='my-2'>
              <FormLabel>Price</FormLabel>
              <FormControl
              type='number'
              placeholder='Enter Price'
              value={price}
              onChange={(e)=>setPrice(e.target.value)}>
              </FormControl>
            </FormGroup>

            <FormGroup controlId='image'>
              <FormLabel>Image</FormLabel>
              <FormControl
              type='text'
              placeholder='Enter image'
              value={image}
              onChange={(e)=>setImage(e.target.value)}>
              </FormControl>

              <FormControl
              label='Choose File'
              onChange={uploadFileHandler}
              type='file'>
              </FormControl>
              
              {loadingUpload && <Loader/>}
            </FormGroup>

            <FormGroup className='my-2'>
              <FormLabel>Brand</FormLabel>
              <FormControl
              type='text'
              placeholder='Brand'
              value={brand}
              onChange={(e)=>setBrand(e.target.value)}>
              </FormControl>
            </FormGroup>

            <FormGroup className='my-2'>
              <FormLabel>Count In Stock</FormLabel>
              <FormControl
              type='number'
              placeholder='How many? '
              value={countInStock}
              onChange={(e)=>setCountInStock(e.target.value)}>
              </FormControl>
            </FormGroup>

            <FormGroup className='my-2'>
              <FormLabel>Category</FormLabel>
              <FormControl
              type='text'
              placeholder='Category '
              value={category}
              onChange={(e)=>setCategory(e.target.value)}>
              </FormControl>
            </FormGroup>

            <FormGroup className='my-2'>
              <FormLabel>Description</FormLabel>
              <FormControl
              type='text'
              placeholder='Descriptiom'
              value={description}
              onChange={(e)=>setDescription(e.target.value)}>
              </FormControl>
            </FormGroup>
        
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
          </FormContainer>)
  )
}

export default ProductEditScreen