import React, { useEffect, useState } from 'react'
import { allUsersOrdersAPI } from '../services/allAPIs';
import { useParams } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { baseUrl } from '../services/baseUrl';
import { format } from 'date-fns';
import Header from './Header';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from 'mdb-react-ui-kit';

function AllOrders() {
    const {id} = useParams();
    console.log(id);
    //api call to get all orders
    const [allOrders,setAllOrders] = useState([])
    const getAllUsersOrders = async()=>{
      const token = sessionStorage.getItem("token")
      console.log(token);
      if(token){
        const reqHeader ={
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        try{
          const result = await allUsersOrdersAPI(reqHeader)
          if(result.status === 200){
            setAllOrders(result.data)
            console.log(allOrders);
          }
          else{
            alert("Failed to get orders")
          }
        }
        catch(err){
          alert("Error getting orders "+err.message)
        }
      }
    }
    useEffect(()=>{
     getAllUsersOrders()
    },[])
  return (
    <div>
        <Header/>
        <div style={{backgroundColor:'rgba(244,222,203,0.7)'}}>
        {
            allOrders.length>0?
            <Row className='p-5' style={{width:'100%'}}>
                {
                allOrders.map((item,index)=>(
                    item.userId==id?
                    <div className='my-4 mx-3' style={{width:'355px'}}>
                      <MDBCard key={index} style={{ paddingBlock:'15px', border:'2px solid rgb(176,113,84)',color:'rgb(176,113,84)'}}>
                      <MDBCardBody>
                          {item.items.map(book => (
                            <div className='d-flex' key={book._id}>
                              <div className='p-3'><img width={'50px'} height={'70px'} src={book ? `${baseUrl}/uploads/${book.bookImage}` : 'empty image'} alt="" /></div>
                              <div className='p-3'><h6><span>{book.title}</span></h6>&#x20B9; {book.price}</div>
                            </div>
                          ))}
                          <hr />
                        <MDBCardText>
                          <h6 className='my-4'>Order Id: <span>{item._id}</span></h6>
                          <h6 className='my-4'>Amount: &#x20B9; <span>{item.amount}</span></h6>
                          <h6 className='my-4'>Date: <span>{format(item.createdAt, 'dd MMM yyyy')}</span></h6>
                          <h6 className='my-4'>Status: <span>{item.status}</span></h6>
                        </MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                    
                    </div>
                      :''
                      ))
                      }
                      <div className='text-center mt-5'>
                        <a style={{backgroundColor: 'rgb(58,35,23)', color:'white'}} href='/users' className='btn'>Go Back</a>
                      </div>
                </Row>
                    :<div className='text-center py-5'>
                      <p style={{color:'rgb(58,35,23)'}} className='mb-5 fw-bolder fs-5'>No orders yet</p>
                      <img style={{border:'2px solid rgb(176,113,84)'}} className='mb-5' width={'300px'} src="https://i.pinimg.com/originals/5b/f0/a3/5bf0a3e0601d35349c5451fa52138ea6.gif" alt="" />
                      <br />
                      <a style={{backgroundColor: 'rgb(58,35,23)', color:'white'}} href='/users' className='btn'>Go Back</a>
                    </div>
        }
        </div>
    </div>
  )
}

export default AllOrders