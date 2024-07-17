import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromCart, emptyCart } from '../Redux/Slice/cartSlice'
import { useNavigate } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { baseUrl } from '../services/baseUrl'
import { addOrderAPI } from '../services/allAPIs'
import Header from '../Components/Header'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from 'mdb-react-ui-kit';

function Cart(){
  const location = useNavigate()
    const [isOrder, setIsOrder] = useState(0)
    const [token,setToken] = useState("")
    const existingUser = JSON.parse(sessionStorage.getItem('existingUser'))
    var itemArray = JSON.parse(sessionStorage.getItem(existingUser._id))
    console.log(itemArray);
    const deleteFromItemArray=(id)=>{
      const updatedItemArray = itemArray.filter(item => item._id !== id);
      // Update the sessionStorage with the updated itemArray
      const updatedItemArrayString = JSON.stringify(updatedItemArray);
      sessionStorage.setItem(existingUser._id, updatedItemArrayString);
      itemArray = JSON.parse(sessionStorage.getItem(existingUser._id))
      location('/cart')
    }
    useEffect(()=>{
      if(sessionStorage.getItem('token')){
        setToken(sessionStorage.getItem('token'))
      }
    },[])
    const navigate = useNavigate()
    const cartArray = useSelector((state)=>state.cartReducer)
    const dispatch = useDispatch()
    //to hold total price of products
    const [total,setTotal] = useState(0)
    
    const getCartTotal=()=>{
      if(cartArray.length>0){
        setTotal(cartArray.map((item)=>item.price).reduce((p1,p2)=>p1+p2))
      }
      else{
        setTotal(0)
      }
    }
    const [orderDetails, setOrderDetails] = useState({
        items:cartArray,amount:total,status:"pending",createdAt:new Date()
    })

    useEffect(()=>{
        getCartTotal()
      },[cartArray])

    const emptyCartList=()=>{
        getCartTotal()
        const cartdet = {
            items:cartArray, amount:total, status:"pending", createdAt:new Date()
        }
        setOrderDetails(cartdet)
        setIsOrder(1)
    alert('Order saved')
    }
    useEffect(()=>{
      console.log(orderDetails);
  },[orderDetails])

  const emptyCartList2=(total2)=>{
    
    const cartdet = {
        items:itemArray, amount:total2, status:"pending", createdAt:new Date()
    }
    setOrderDetails(cartdet)
    setIsOrder(1)
    alert('Order saved')

}
    const orderAdd=async()=>{
          //api call
          const reqBody = {
            items:orderDetails.items,
            amount:orderDetails.amount,
            status:orderDetails.status,
            createdAt:orderDetails.createdAt
          }
          // let reqHeader
          const reqHeader = {
            "Content-Type":"application/json", 
            "Authorization":`Bearer ${token}` //to send token fom client side to server side
          }
        const result = await addOrderAPI(reqBody,reqHeader);
        console.log(result);
        if(result.status===200){
          alert('Order placed')
          console.log(result.data);
          location('/order-placed')
        }
        else{
          console.log(result.response.data);
        }
        dispatch(emptyCart())
        const updatedItemArray = {}
        // Update the sessionStorage with the updated itemArray
        const updatedItemArrayString = JSON.stringify(updatedItemArray);
        sessionStorage.setItem(existingUser._id, updatedItemArrayString);
        itemArray = JSON.parse(sessionStorage.getItem(existingUser._id))
        setIsOrder(0)
        navigate('/order-placed')
      }
      console.log(cartArray);

    const setArray=()=>{
      const cartArrayString = JSON.stringify(cartArray);
    const userId = JSON.parse(sessionStorage.getItem('existingUser'))._id;
    sessionStorage.setItem(userId, cartArrayString);
    }
    
  return (
    <div style={{backgroundColor:'rgba(244,222,203,0.7)'}}>
      <Header/>
      <div style={{color:'rgb(176,113,84)', backgroundColor:'white'}} className='text-center mt-5 mx-5 pt-3 pb-2'>
        <h6><span>Payment on delivery only.</span> Once order confirmed, your books will reach your doorstep.</h6>
      </div>
    {
      cartArray.length>0?
    <Row className='p-5' style={{width:'100%'}}>
        <Col id='d5' className='text-center d-flex'>
            {cartArray.map((item,index)=>(
                    <MDBCard key={index} style={{width:'250px', margin:'20px', paddingBlock:'20px', border:'2px solid rgb(176,113,84)',color:'rgb(176,113,84)'}}>
                      <MDBCardBody>
                        <MDBCardText>
                          <img width={'100px'} src={item?`${baseUrl}/uploads/${item.bookImage}`:'empty image'} alt="" />
                          <h6 className='my-4'><span>Id: </span>{item._id}</h6>
                          <h6 className='my-4'><span>Title: </span>{item.title}</h6>
                          <div className='d-flex justify-content-evenly'>
                          <h6 className=''><span>Price: </span>&#x20B9; {item.price}</h6>
                          <h6 style={{color:'rgb(58,35,23)'}} className='ms-5'>{isOrder==0&&<i onClick={()=>dispatch(deleteFromCart(item._id))} className='fa-solid fa-trash'></i>}</h6>
                          </div>
                        </MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  ))}
                </Col>
                <Col>
                  <div style={{color:'rgb(176,113,84)'}} className='p-2 text-center mt-5'>
                    <div style={{backgroundColor:'white'}} className='mx-5 py-3'>
                    <h3 className='text-center my-3'><span>Cart Summary</span></h3>
                    <h6 className='my-4 fw-bolder'>Total Cart Item: {cartArray.length}</h6>
                    <h6 className='my-4 fw-bolder'>Total Price: Rs. {total}</h6>
                    </div>
                    <div className='text-center mt-5'>
                      {
                        isOrder==0?<button style={{backgroundColor: 'rgb(58,35,23)', color:'white'}} onClick={emptyCartList} className='btn'>Save Order</button>
                        :<button style={{backgroundColor: 'rgb(58,35,23)', color:'white'}} onClick={orderAdd} className='btn'>Confirm order</button>
                      }
                    </div>
                    <button style={{backgroundColor: 'rgb(176,113,84)', color:'white'}} onClick={setArray} className='btn mt-4'>save items and come back later</button>
                  </div>
                </Col>
            </Row>
            :itemArray&&itemArray.length>0?
            <Row className='p-5' style={{width:'100%'}}>
            <Col id='d5' className='text-center d-flex'>
            {itemArray.map((item,index)=>(
              <MDBCard key={index} style={{width:'250px', margin:'10px', paddingBlock:'20px', border:'2px solid rgb(176,113,84)', color:'rgb(176,113,84)'}}>
                      <MDBCardBody>
                        <MDBCardText>
                          <img width={'100px'} src={item?`${baseUrl}/uploads/${item.bookImage}`:'empty image'} alt="" />
                          <h6 className='my-4'><span>Id: </span>{item._id}</h6>
                          <h6 className='my-4'><span>Title: </span>{item.title}</h6>
                          <div className='d-flex justify-content-evenly'>
                          <h6 className=''><span>Price: </span>&#x20B9; {item.price}</h6>
                          <h6 style={{color:'rgb(58,35,23)'}} className='ms-5'>{isOrder==0&&<i onClick={()=>deleteFromItemArray(item._id)} className='fa-solid fa-trash'></i>}</h6>
                          </div>
                        </MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  ))}
                </Col>
                <Col>
                  <div style={{color:'rgb(176,113,84)'}} className='p-2 text-center mt-5'>
                  <div style={{backgroundColor:'white'}} className='mx-5 py-3'>
                    <h3 className='text-center my-3'><span>Cart Summary</span></h3>
                    <h6 className='my-4 fw-bolder'>Total Cart Item: {itemArray.length}</h6>
                    <h6 className='my-4 fw-bolder'>Total Price: Rs. { itemArray.map((item)=>item.price).reduce((p1,p2)=>p1+p2)}</h6>
                  </div>
                    <div className='text-center mt-5'>
                      {
                        isOrder==0?<button style={{backgroundColor: 'rgb(58,35,23)', color:'white'}} onClick={()=>emptyCartList2(itemArray.map((item)=>item.price).reduce((p1,p2)=>p1+p2))} className='btn'>Save Order</button>
                        :<button style={{backgroundColor: 'rgb(58,35,23)', color:'white'}} onClick={orderAdd} className='btn'>Confirm order</button>
                      }
                    </div>
                    <button style={{backgroundColor: 'rgb(176,113,84)', color:'white'}} className='btn mt-4'>save items and come back later</button>
                  </div>
                </Col>
            </Row>
            :
                <div className='text-center py-5'>
                  <img style={{backgroundColor:'white',border:'2px solid rgb(176,113,84)'}} className='mb-5 p-4' width={'280px'} src="https://assets-v2.lottiefiles.com/a/7b264970-1167-11ee-813e-fb3408905ffd/cBuAtbkfQC.gif" alt="" />
                  <div className='text-center mb-3'><a href='/dashboard' className='btn' style={{backgroundColor: 'rgb(58,35,23)', color:'white'}}>Start Shopping</a></div>
                </div>
              }
    </div>
  )
}

export default Cart