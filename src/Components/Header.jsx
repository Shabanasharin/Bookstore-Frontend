import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
function Header() {
    const [openNav, setOpenNav] = useState(false);
    const cartArray = useSelector((state)=>state.cartReducer)
    const existingUser = JSON.parse(sessionStorage.getItem('existingUser'))
    const itemArray = JSON.parse(sessionStorage.getItem(existingUser._id))

  return (
    <div>
        <MDBNavbar style={{boxShadow:'none'}} expand='lg' light bgColor='light'>
      <MDBContainer fluid>
      <MDBNavbarBrand style={{color:'rgb(75, 3, 3)'}} href='/'>
      <img src='https://cdn-icons-png.flaticon.com/512/2232/2232688.png'
              height='22'
              alt=''
              loading='lazy'
            />
        Bookshelf</MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenNav(!openNav)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar open={openNav}>
          <MDBNavbarNav className='d-flex justify-content-center'>
            <MDBNavbarItem>
              <MDBNavbarLink className='navlink' active aria-current='page' href='/dashboard'>
                All Books
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink className='navlink' href='/newarrivals'>New Arrivals</MDBNavbarLink>
            </MDBNavbarItem>
            {
              existingUser.role=='admin'&&
              <MDBNavbarItem>
              <MDBNavbarLink className='navlink' href='/users'>All Users</MDBNavbarLink>
              </MDBNavbarItem>  
            }
            {
              existingUser.role=='user'?
              <MDBNavbarItem>
              <MDBNavbarLink className='navlink' href='/orders'>Orders</MDBNavbarLink>
              </MDBNavbarItem>:
            <MDBNavbarItem>
            <MDBNavbarLink className='navlink' href='/orders/all-users'>All Orders</MDBNavbarLink>
            </MDBNavbarItem>
            }
          </MDBNavbarNav>
          {
            existingUser.role=='user'&&
            <Link to={'/cart'} >
            <button style={{boxShadow:'none', color:'rgb(75, 3, 3)'}} className='btn d-flex'><i class="fa-solid fa-cart-shopping"></i><Badge bg='light' className="text-dark">{itemArray?itemArray.length:cartArray.length}</Badge></button>
            </Link>
          }
          <Link to={'/'}>
            <button style={{boxShadow:'none', color:'rgb(75, 3, 3)'}} className='btn'><i class="fa-solid fa-right-from-bracket"></i></button>
          </Link>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    </div>
  )
}

export default Header