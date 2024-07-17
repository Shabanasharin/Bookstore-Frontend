import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPIs'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBCollapse,
    MDBIcon,
    MDBBtn
  } from 'mdb-react-ui-kit';

function Auth({register}) {
  const [openNav, setOpenNav] = useState(false);
  const location = useNavigate()
  const isRegisterForm = register?true:false 
  const [userData, setUserData] = useState({
    username:"",
    email:"",
    password:"",
    role:"user",
    address:""
  })
  const registerData = async()=>{
    const {username,email,password,role,address} = userData
    if(!username || !email || !password || !address){
      alert("Please fill all details")
    }
    else{
      const result = await registerAPI(userData)
      console.log(result);
      if(result.status==200){
        alert(result.data)
        location('/login')
      }
      else(
        alert(result.response.data)
      )
    }
  }
  const login = async()=>{
    const {email,password} = userData
    if(!email || !password){
      alert("Please fill all details")
    }
    else{
      const result = await loginAPI(userData)
      console.log(result); 
      if(result.status==200){
        alert("Login successful")
        sessionStorage.setItem('existingUser', JSON.stringify(result.data.user))
        sessionStorage.setItem('token',result.data.token)
        location('/dashboard')
      }
      else(
        alert("Invalid Login")
      )
    }
  }
  return (
    <div style={{backgroundColor:'rgba(244,222,203,0.7)'}} className='w-100'>
      <div className='w-100'>
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
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    </div>
      <div className="row py-3 px-5 w-100">
          <div id='d1' className="row w-100">
            <div id='logimg' className="col-5 py-5 ps-5 mx-5">
              <img width={'300px'} src="https://media4.giphy.com/media/324sEkye9F1NMIvogH/giphy.gif?cid=6c09b952epo58zacih7f9xn7h6c1oh5pyoro565jeminened&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s" alt="" />
            </div>
            <div id='auth' className="col-5 py-5 px-5">
              <h4 style={{color:'rgb(58,35,23)'}} className='text-center mb-5 fw-bold'>
                {
                  isRegisterForm?'Register':'Login'
                }
              </h4>
              <form>
                {
                  isRegisterForm &&
                  <input style={{paddingBlock:'5px', paddingInline:'15px', border:'1px solid rgb(176,113,84)'}} type="text" value={userData.username} onChange={e=>setUserData({...userData, username:e.target.value})} placeholder='Username' className='form-control mb-4' />
                }
                <input style={{paddingBlock:'5px', paddingInline:'15px', border:'1px solid rgb(176,113,84)'}} type="text" value={userData.email} onChange={e=>setUserData({...userData, email:e.target.value})} placeholder='Email' className='form-control mb-4'/>
                <input style={{paddingBlock:'5px', paddingInline:'15px', border:'1px solid rgb(176,113,84)'}} type="password" value={userData.password} onChange={e=>setUserData({...userData, password:e.target.value})} placeholder='Password' className='form-control mb-4'/>
                {
                  isRegisterForm &&
                  <input style={{paddingBlock:'5px', paddingInline:'15px', border:'1px solid rgb(176,113,84)'}} type="text" value={userData.address} onChange={e=>setUserData({...userData, address:e.target.value})} placeholder='Address' className='form-control mb-4' />
                }
              </form>
              {
                isRegisterForm ?
                <div className='text-center my-4'>
                  <button style={{backgroundColor: 'rgb(58,35,23)', color:'white'}} onClick={registerData} className='btn'>Register</button>
                  <Link style={{textDecoration:'none'}} to={'/login'}>
                    <p className='my-4 text-dark'>Already registered? Login here</p>
                  </Link>
                </div>
                :
                <div className='text-center my-4'>
                  <button style={{backgroundColor: 'rgb(58,35,23)', color:'white'}} onClick={login} className='btn'>Login</button>
                  <Link style={{textDecoration:'none'}} to={'/register'}>
                    <p className='mt-5 text-dark'>New here? Register now</p>
                  </Link>
                </div>
              }
            </div>
          </div>
        <div style={{width:'100%'}} className='text-center mb-3'>
          <Link to={'/'}>
            <button style={{backgroundColor: 'rgb(58,35,23)', color:'white'}} className='btn'>Go back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Auth