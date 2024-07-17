import React from 'react'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'

function OrderPlaced() {
  return (
    <div style={{backgroundColor:'rgba(244,222,203,0.7)'}}>
        <Header/>
        <div className='text-center my-5 pb-5'>
            <h4 style={{color:'rgb(58,35,23)'}} className='mb-3 fw-bolder'>Order Successful!</h4>
            <p>Thank you so much for your order.</p>
            <img style={{border:'2px solid rgb(176,113,84)', backgroundColor:'white'}} className='my-4 p-4' width={'220px'} src="https://media.baamboozle.com/uploads/images/532937/1647315993_89471_gif-url.gif" alt="" />
            <p className='pt-3'>Your books are on their way to you. Happy Reading!</p>
            <div className='text-center my-4'>
                <Link to={'/dashboard'}><button style={{backgroundColor: 'rgb(58,35,23)', color:'white'}} className='btn'>Home</button></Link>
            </div>
        </div>
    </div>
  )
}

export default OrderPlaced