import React, { useEffect, useState } from 'react'
import { Form,Button,FormControl,FormLabel,FormGroup, FormCheck } from 'react-bootstrap'
import FormContainer from '../../components/FormContainer'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { useUpdateUserMutation,useGetUserDetailsQuery } from '../../slices/usersApiSlice'

import Loader from '../../components/Loader'
import { toast } from 'react-toastify'


const UserEditScreen = () => {

    const {id}=useParams();
    const navigate=useNavigate();

    const {data:user,isLoading,error,refetch}=useGetUserDetailsQuery(id);
    const [updateUser,{loadingupdate}] = useUpdateUserMutation();

    const [name,setName]=useState('')
    const [email,setEmail]=useState()
    const [isAdmin,setIsAdmin]=useState(false) 


    useEffect(()=>{
        if(user){
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
        }
    },[user])



    const formHandler=async(e)=>{
        e.preventDefault();
        try{
        await updateUser({
            id,
        name,email,isAdmin
        }).unwrap();
        toast.success('Product updated ')
        refetch()
        navigate('/admin/userlist')
    }catch(err){
        toast.error(err?.data?.message || err.error);
    }
    }
    
  return (
    <>
       <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>

        {isLoading ? (<Loader/>) : (
        <FormContainer>
            <h1>Edit User</h1>
            <Form onSubmit={formHandler}>
            <FormGroup controlId='name' className='my-2'>
              <FormLabel>Name</FormLabel>
              <FormControl
              type='text'
              placeholder='Username'
              value={name}
              onChange={(e)=>setName(e.target.value)}>
              </FormControl>
            </FormGroup>

            <FormGroup controlId='email' className='my-2'>
              <FormLabel>Email</FormLabel>
              <FormControl
              type='email'
              placeholder='email'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}>
              </FormControl>
            </FormGroup>

            <FormGroup controlId='isAdmin' className='my-2'>
              
              <FormCheck
              type='checkbox'
              label='Is Admin?'
              placeholder='Is Admin'
              checked={isAdmin}
              onChange={(e)=>setIsAdmin(e.target.checked)}>
              </FormCheck>
            </FormGroup>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
          </FormContainer>
          )
        }
          </>
  )
}

export default UserEditScreen