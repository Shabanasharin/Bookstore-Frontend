import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { allUsersAPI } from '../services/allAPIs'
import { Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from 'mdb-react-ui-kit';
function Users() {
  const [searchKey, setSearchKey] = useState("")
  console.log(searchKey);
    //api call to get all users
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

  return (
    <div style={{backgroundColor:'rgba(244,222,203,0.7)'}}>
      <Header/>
      <div className='mx-5 pt-3 pb-2 rounded text-center mt-5' style={{backgroundColor:'rgb(168,126,98)'}}>
          <h4 style={{color:'white'}}>All Users</h4>
      </div>
      <div className='d-flex justify-content-center mt-5 pt-3'>
        <input style={{width:'350px', paddingBlock:'5px', paddingInline:'15px', border:'1px solid rgb(176,113,84)'}} onChange={e => setSearchKey(e.target.value)} type="text" placeholder='Search by email id' className='form-control' />
      </div>
      <div>
        {
          allUsers.length>0?
          <Row className='py-5 px-3 text-center' style={{width:'100%', flexWrap:'wrap'}}>
              {
              allUsers.map((item,index)=>(
                item.role=='user'?
                <div className='mx-4 my-5' style={{width:'360px'}}>
                  <MDBCard className='py-3' style={{border:'2px solid rgb(176,113,84)', height:'350px', color:'rgb(176,113,84)'}}>
                  <MDBCardBody>
                    <MDBCardTitle>Name: <span>{item.username}</span></MDBCardTitle>
                    <MDBCardText>
                      <h6 className='my-4'>User Id: <span>{item._id}</span></h6>
                      <h6 className='my-4'>Email: <span>{item.email}</span></h6>
                      <h6 className='my-4'>Address: <span>{item.address}</span></h6>
                      <Link to={`/all-users-orders/${item._id}`}><button style={{backgroundColor: 'rgb(58,35,23)', color:'white'}} className='btn'>View Orders</button></Link>
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
                </div>
              :''
                    ))
                    }
                    <div className='text-center mt-5'>
                      <a style={{backgroundColor: 'rgb(58,35,23)', color:'white'}} href='/dashboard' className='btn'>Go Back</a>
                    </div>
              </Row>:'no users'
        }
      </div>
    </div>
  )
}

export default Users