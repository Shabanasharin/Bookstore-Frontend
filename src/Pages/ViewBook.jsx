import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { allBooksAPI } from '../services/allAPIs'
import { baseUrl } from '../services/baseUrl'
import { useDispatch } from 'react-redux'
import Header from '../Components/Header'

function ViewBook() {
  const dispatch = useDispatch()
    const {id} = useParams()
    const [allBooks, setAllBooks] = useState([])
    const [searchKey, setSearchKey] = useState("")
  //api call function
  const getAllBooks = async()=>{
    //get token
    const token = sessionStorage.getItem("token")
    console.log(token);
    if(token){
      const reqHeader ={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      try{
        const result = await allBooksAPI(searchKey,reqHeader)
        if(result.status == 201){
          setAllBooks(result.data)
          console.log(allBooks);
        }
        else{
          alert("Failed to get books")
        }
      }
      catch(err){
        alert("Error getting books"+err.message)
      }
    }
  }
  useEffect(()=>{
    getAllBooks()
  },[searchKey])
return (
    <div>
      <Header/>
      <div className='py-3' style={{backgroundColor:'rgba(244,222,203,0.7)'}}>
      {
        allBooks.map(item => (
          item._id==id?
          <div style={{backgroundColor:'rgb(176,113,84)', color:'rgb(244,222,203)',border:'1px solid rgb(58,35,23)'}} id='d3' className='d-flex m-5 pe-3'>
            <div>
              <img width={'300px'} src={item?`${baseUrl}/uploads/${item.bookImage}`:'empty image'} alt="" />
            </div>
            <div className='ms-5 mt-5'>
              <h4 className='mt-4 fw-bolder'><span>Title:</span> &nbsp;{item.title}</h4>
              <h6 className='mt-4 fw-bolder'><span>Author:</span> &nbsp;{item.author}</h6>
              <h6 className='mt-4 fw-bolder'><span>Genre:</span> &nbsp;{item.genre}</h6>
              <h6 className='mt-4 fw-bolder'><span>Price:</span>&nbsp; &#8377; {item.price}</h6>
              <p className='mt-4 fw-bolder'><span>Summary:</span> &nbsp;{item.description}</p>
              <div className='d-flex justify-content-evenly mt-5 mb-3'>
                <a style={{backgroundColor: 'rgb(58,35,23)', color:'white'}} href="/dashboard" className='btn'>Go Back</a>
              </div>
            </div>
          </div>
          :''
        ))
      }</div>
    </div>
  )
}

export default ViewBook