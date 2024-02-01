import React from 'react'
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
    const {userInfo}=useSelector(state=>state.auth);

  return (userInfo && userInfo.isAdmin ? (<Outlet/>):<Navigate to='/login' replace/>)
}

export default AdminRoute