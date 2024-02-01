import React from 'react'
import { useSelector } from 'react-redux'
import { Col,Row,Table,Button} from 'react-bootstrap';
import Message from '../../components/Message';
import { FaCheck, FaEdit, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';
import {useDeleteUserMutation, useGetAllUsersQuery}from '../../slices/usersApiSlice'
import Loader from '../../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';

const UserListScreen = () => {

    const{data:users,isLoading,error,refetch}=useGetAllUsersQuery();
    const [deleteUser,{loadingDelete}]=useDeleteUserMutation();

    const deleteHandler=async(id)=>{
        if(window.confirm('Are you sure')){
        try{
        await deleteUser(id);
        toast.success('User deleted');
        refetch();
        }catch(err){
            toast.error(err?.data?.message||err.error)
        }
    }
    }
  return (
    <div>
        <h1>Users</h1>
        {loadingDelete && <Loader/>}
      {
    isLoading ? <Loader/>:error ?   
    <Message variant='danger'>
      {error}
    </Message> :(<Table striped hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
          </tr>
        </thead>
        <tbody>
          {users 
          &&
          users.map((user)=>(
            <tr>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
              <td>
                {user.isAdmin ? (
                <FaCheck style={{color:'green'}}/>
                ) : (
                <FaTimes style={{color:'red'}}/>
                )}
              </td>

              <td>
              <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                        <FaEdit/>
                    </Button>
                </LinkContainer>
                <Button
                variant='danger'
                className='btn-sm'
                onClick={()=>deleteHandler(user._id)}>
                    <FaTrash style={{color:'white'}}/>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        </Table>
    )
    }
    </div>
  )
}

export default UserListScreen

