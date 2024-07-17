import React, { useContext, useEffect, useState } from 'react';
import { allUsersAPI, allUsersOrdersAPI, updateOrderAPI } from '../services/allAPIs';
import { Row } from 'react-bootstrap';
import { baseUrl } from '../services/baseUrl';
import { format } from 'date-fns';
import Header from '../Components/Header';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn
  } from 'mdb-react-ui-kit';

function AllUsersOrders() {
    const [newStatus, setNewStatus] = useState('')
    const [allOrders, setAllOrders] = useState([]);

    const [token,setToken] = useState("")
    useEffect(()=>{
      if(sessionStorage.getItem('token')){
        setToken(sessionStorage.getItem('token'))
      }
    },[])
    const [searchKey, setSearchKey] = useState("")
    const [allUsers,setAllUsers] = useState([])

    const getAllUsers = async()=>{
        const token = sessionStorage.getItem("token")
        console.log(token);
        if(token){
          const reqHeader ={
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          }
          try{
            const result = await allUsersAPI(searchKey,reqHeader)
            if(result.status == 201){
              setAllUsers(result.data)
              console.log(allUsers);
            }
            else{
              alert("Failed to get users")
            }
          }
          catch(err){
            alert("Error getting users "+err.message)
          }
        }
      }
      useEffect(()=>{
        getAllUsers()
      },[searchKey])

    const updateOrder = async(item)=>{
        console.log(item);
        const reqBody = {
            items:item.items,
            amount:item.amount,
            status:newStatus,
            createdAt:item.createdAt
          }
          // let reqHeader
          const reqHeader = {
            "Content-Type":"application/json", 
            "Authorization":`Bearer ${token}` //to send token fom client side to server side
          }
          const result = await updateOrderAPI(item._id,reqBody,reqHeader)
            console.log(result);
            if(result.status==200){
              console.log(result.data);
              alert('Order updated successfully')
              getAllUsersOrders()
            }
            else{
              console.log(result.response.data);
            }
    }
    const getAllUsersOrders = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };
            try {
                const result = await allUsersOrdersAPI(reqHeader);
                if (result.status === 200) {
                    setAllOrders(result.data);
                } 
                else {
                    alert("Failed to get orders");
                }
            } catch (err) {
                alert("Error getting orders " + err.message);
            }
        }
    };

    useEffect(() => {
        getAllUsersOrders();
    }, []);

    const getUserEmail = (userId) => {
        const user = allUsers.find(user => user._id === userId);
        return user ? user.email : '';
    };
    const renderOrdersByStatus = (status) => {
        return allOrders
            .filter(order => order.status === status)
            .map((item, index) => (
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
                    <h6 className='my-4'>User Email: <span>{getUserEmail(item.userId)}</span></h6>
                    <h6 className='my-4'>Amount: <span>&#x20B9; {item.amount}</span></h6>
                    <h6 className='my-4'>Date: <span>{format(item.createdAt, 'dd MMM yyyy')}</span></h6>
                    <h6 className='my-4'>Status: <span>{item.status}</span></h6>
                    {
                      item.status!='delivered'?
                      <div className='d-flex justify-content-evenly'>
                      <input style={{width:'170px', border:'1px solid rgb(176,113,84)'}} className='form-control' type="text" onChange={e=>setNewStatus(e.target.value)} placeholder='new status' /><br />
                      <button style={{backgroundColor: 'rgb(58,35,23)', color:'white'}} onClick={e=>updateOrder(item)} className='btn'>Update</button>
                      </div>:''
                    }
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
              </div>
            ));
    };

    return (
        <div className='w-100'>
            <Header />
            <div style={{backgroundColor:'rgba(244,222,203,0.7)'}}>
                {allOrders.length > 0 ?
                    <Row className='w-100 p-5'>
                      <div className='ms-2 pt-3 pb-2 rounded text-center mt-3 mb-5' style={{backgroundColor:'rgb(168,126,98)'}}>
                        <h4 style={{color:'white'}}>Pending Orders</h4>
                      </div>
                      {renderOrdersByStatus('pending')}
                      <div className='ms-2 pt-3 pb-2 rounded text-center mt-5 mb-5' style={{backgroundColor:'rgb(168,126,98)'}}>
                        <h4 style={{color:'white'}}>Shipped Orders</h4>
                      </div>
                      {renderOrdersByStatus('shipped')}
                      <div className='ms-2 pt-3 pb-2 rounded text-center mt-5 mb-5' style={{backgroundColor:'rgb(168,126,98)'}}>
                        <h4 style={{color:'white'}}>Delivered Orders</h4>
                      </div>
                      {renderOrdersByStatus('delivered')}
                        <div className='text-center mt-5'>
                            <a style={{backgroundColor: 'rgb(58,35,23)', color:'white'}} href='/dashboard' className='btn btn-primary'>Go Back</a>
                        </div>
                    </Row>
                    :''
                }
            </div>
        </div>
    );
}

export default AllUsersOrders;
