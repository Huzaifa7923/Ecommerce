import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from '../slices/usersApiSlice';
import {setCredentials} from '../slices/authSlice'
// import { NavbarCollapse } from 'react-bootstrap';
import {toast} from 'react-toastify'
import FormContainer from '../components/FormContainer'
import { useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import {Row,Col} from 'react-bootstrap'

const Login = () => {
    const navigate= useNavigate();
    const dispatch=useDispatch();

    // const x=useLoginMutation();console.log(x);x is an 

    const [login, { isLoading }] = useLoginMutation();

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    // const x=useSelector(state=>state.auth); // console.log(x);
    const {userInfo}=useSelector(state=>state.auth);
    
    // const x=useLocation();// console.log(x);
    const {search}=useLocation(); //{search: '?redirect=/shipping',} 
    
    const sp=new URLSearchParams(search); 
    const redirect=sp.get('redirect') || '/' 

//IF LOGIN , THEN DELETE COOKIE , THEN IF NOT RELOAD STILL INSIDE USEEFFECT
    useEffect(()=>{
        if(userInfo){
            // console.log('ALREADY LOGIN HAI BHAI with userinfo as below');
            // console.log(userInfo)
            navigate(redirect);
        }
    },[userInfo,navigate,redirect])

    const emailHandler=(e)=>{
        setEmail(e.target.value)
    }

    const passwordHandler=(e)=>{
        setPassword(e.target.value)
    }

    const formHandler=async(e)=>{
        e.preventDefault();

        try{
        const res=await login({email,password}).unwrap();
        dispatch(setCredentials({...res}));
        console.log(res);
        navigate(redirect)
        }catch(err){
            toast.error(err?.data?.message||err.error);
        }
    }
  return (
    <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={formHandler}>
            <Form.Group className='my-2' controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={emailHandler}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={passwordHandler}
                >
                </Form.Control>
                </Form.Group>

                <Button disabled={isLoading} type='submit' variant='primary'>
                    Sign In
                </Button>
                </Form>

                <Row className='py-3'>
                    <Col>
                    New Customer?{' '}
                    <Link to={redirect?`/register?redirect=${redirect}`:'/register'}>Register
                    </Link>
                    </Col>
                </Row>
    </FormContainer>
  )
}

export default Login