import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import {Row,Col, Form } from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom';
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { useLocation,Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'



const RegisterScreen = () => {
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [email,setEmail]=useState('');

    const navigate = useNavigate();
    const dispatch=useDispatch();


    const [register,{isLoading}]=useRegisterMutation();
    const {userInfo}=useSelector(state=>state.auth)

    const {search}=useLocation();    
    const sp=new URLSearchParams(search);
    const redirect=sp.get('redirect') || '/'

    useEffect(()=>{
        if(userInfo){
            navigate(redirect);            
        }
    },[userInfo,redirect,navigate])


    const formHandler=async(e)=>{
        e.preventDefault();
        if(password!==confirmPassword){
            toast.error('Password do not match');
        }else{
        try{
        const user=await register({name,email,password}).unwrap();
        dispatch(setCredentials({...user}));
        navigate(redirect);
        }catch(err){
            toast.error(err?.data?.message||err.error);
        }
    }
}

  return (
    <FormContainer>
        <h1>Register</h1>
        <Form onSubmit={formHandler}>
            <Form.Group className='my-2' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                >
                </Form.Control>
                </Form.Group>

            <Form.Group className='my-2' controlId='password'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                >
                </Form.Control>
                </Form.Group>

                <Button disabled={isLoading} type='submit' variant='primary'>
                    Register
                </Button>
                </Form>

                <Row className='py-3'>
                    <Col>
                    Already have a account?{' '}
                    <Link to={redirect?`/login?redirect=${redirect}`:'/login'}>Login
                    </Link>
                    </Col>
                </Row>
    </FormContainer>
  )
}

export default RegisterScreen