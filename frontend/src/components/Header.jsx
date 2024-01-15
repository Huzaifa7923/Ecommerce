import {Container,Navbar, Dropdown,Nav} from 'react-bootstrap';
import {FaShoppingCart,FaUser} from 'react-icons/fa'
import logo from '../assets/logo.png'
import {LinkContainer} from 'react-router-bootstrap'
import {Badge} from 'react-bootstrap'
import {useSelector} from 'react-redux'

const Header = () => {

  const {cartItems}=useSelector((state)=>state.cart)

  let totalQty=0;

  for(let i=0;i<cartItems.length;++i){
    totalQty+=cartItems[i].qty;
  }
  console.log(totalQty);
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
              <LinkContainer to='/cart'>
              <Nav.Link>
                <FaShoppingCart/>
                Cart
                    <Badge pill bg='primary' style={{ marginLeft: '5px' }}>
                      {totalQty}
                    </Badge>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login'>
              <Nav.Link><FaUser/>Sign In</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
     </header>
  )
}

export default Header