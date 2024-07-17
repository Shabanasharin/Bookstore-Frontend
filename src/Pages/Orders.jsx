import React, { useEffect, useState } from 'react';
import { userOrderAPI } from '../services/allAPIs';
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

function Orders() {
  const [allOrder, setAllOrder] = useState([]);

  const getAllOrders = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      try {
        const result = await userOrderAPI(reqHeader);
        if (result.status === 200) {
          // Sort orders by creation date in descending order
          const sortedOrders = result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setAllOrder(sortedOrders);
        } else {
          alert("Failed to get orders");
        }
      } 
      catch (err) {
        alert("Error getting orders " + err.message);
      }
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div style={{backgroundColor:'rgba(244,222,203,0.7)'}}>
      <Header />
      {allOrder.length > 0 ? (
        <Row className='p-5' style={{ width: '100%' }}>
              {allOrder.map((item, index) => (
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
                          <h6 className='my-4'><span>Order Id: </span>{item._id}</h6>
                          <h6 className='my-4'><span>Amount: </span>&#x20B9; {item.amount}</h6>
                          <h6 className='my-4'><span>Date: </span>{format(item.createdAt, 'dd MMM yyyy')}</h6>
                          <h6 className='my-4'><span>Status: </span>{item.status}</h6>
                        </MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </div>
              ))}
          <div className='text-center mt-5'>
            <a href='/dashboard' className='btn' style={{backgroundColor: 'rgb(58,35,23)', color:'white'}}>Go Back</a>
          </div>
        </Row>
      ) : (
        <div className='text-center py-5'>
          <p style={{color:'rgb(58,35,23)'}} className='mb-5 fw-bolder fs-5'>No orders yet</p>
          <img style={{border:'2px solid rgb(176,113,84)'}} className='mb-5' width={'300px'} src="https://i.pinimg.com/originals/5b/f0/a3/5bf0a3e0601d35349c5451fa52138ea6.gif" alt="" />
          <div className='text-center mb-3'><a href='/dashboard' className='btn' style={{backgroundColor: 'rgb(58,35,23)', color:'white'}}>Start Shopping</a></div>
        </div>
      )}
    </div>
  );
}

export default Orders;
