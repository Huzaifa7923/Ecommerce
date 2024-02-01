import { useSelector } from 'react-redux'
import { useGetOrdersQuery } from '../../slices/ordersApiSlice'
import { Col,Row,Table,Button} from 'react-bootstrap';
import Message from '../../components/Message';
import { FaTimes } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../../components/Loader';

const OrderListScreen = () => {

    const {data:orders,isLoading,error}=useGetOrdersQuery();
    // console.log(orders)
    // console.log('up')
  return (
    <>
    {/* <Col md={9}>  */}
      <h2>ORDERS</h2>
    {
      isLoading ? <Loader/>:error ?   
      <Message variant='danger'>
        {error?.data?.message||error.error}
      </Message> :(
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Id</th>
              <th>USER</th>
              <th>EMAIL</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {
              orders&&orders.map((order)=>(
                <tr>
                  <td>{order._id}</td>
                  <td>{order.user ? order.user.name : 'User Deleted'}</td>
                  <td>{order.user?order.user.email:'User Deleted'}</td>
                  <td>{order.createdAt.substring(0,10)}</td>
                  <td>{order.totalPrice}</td>
                  {
                    order.isPaid ? (<td>{order.paidAt.substring(0,10)}</td>):
                    <td>
                      <FaTimes style={{color:'red'}}></FaTimes>
                    </td>
                  }
                  {
                    order.isDelivered ? (<td>{order.deliveredAt.substring(0,10)}</td>):
                    <td>
                      <FaTimes style={{color:'red'}}></FaTimes>
                    </td>
                  }
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                      Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      )}
        {/* </Col>  */}
    </>
  )
}

export default OrderListScreen