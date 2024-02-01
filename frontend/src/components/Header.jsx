import {Container,Navbar, Dropdown,Nav, NavDropdown} from 'react-bootstrap';
import {FaShoppingCart,FaUser} from 'react-icons/fa'
import logo from '../assets/logo.png'
import {LinkContainer} from 'react-router-bootstrap'
import {Badge} from 'react-bootstrap'
import {useSelector} from 'react-redux'
// import { NavDropdown } from 'react-bootstrap';
import { logout } from '../slices/authSlice';
import { useLogoutMutation} from '../slices/usersApiSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {resetCart} from '../slices/cartSlice';
import SearchBox from './SearchBox';

const Header = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const {cartItems}=useSelector((state)=>state.cart)
  const {userInfo}=useSelector(state=>state.auth);

  const [logoutApiCall,{isLoading}]=useLogoutMutation();

  const logoutHandler=async()=>{
    try{
    await logoutApiCall().unwrap();
    console.log('done')
    dispatch(logout());
    dispatch(resetCart());
    navigate('/login')
    }catch(err){
      toast.error(err?.data?.message||err.error);
    }
  }
  return (
     <header>
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand >
            <img src={logo} alt='Ekart'></img>
            Ekart</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav'/>
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <SearchBox/>
              <LinkContainer to='/cart'>
              <Nav.Link>
                <FaShoppingCart/>
                Cart
                    <Badge pill bg='primary' style={{ marginLeft: '5px' }}>
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                </Nav.Link>
                </LinkContainer>
                {
                  userInfo? (
                    <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                    </NavDropdown>
                  ): (
                  <LinkContainer to='/login'>
                  <Nav.Link><FaUser/>Sign In</Nav.Link>
                  </LinkContainer>) 
                }
                {
                  userInfo&&userInfo.isAdmin? ( 
                    <NavDropdown title='Admin' id='username'>
                    <LinkContainer to='/admin/userlist'>
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer> 
                    <LinkContainer to='/admin/orderlist'>
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/productlist'>
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    </NavDropdown>
                  ): (<></>) 
                }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
     </header>
  )
}

export default Header