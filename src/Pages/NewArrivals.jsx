import React, { useContext, useEffect, useState } from 'react';
import { allBooksAPI, deleteBookAPI } from '../services/allAPIs';
import { baseUrl } from '../services/baseUrl';
import EditBooks from '../Components/EditBooks';
import { addBookContextApi, editBookContextApi } from '../ContextAPI/ContextShare';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/Slice/cartSlice';
import Header from '../Components/Header';

function NewArrivals() {
    const [latestBooks,setLatestBooks] = useState([])
    const [latestBooks1,setLatestBooks1] = useState([])
    const dispatch = useDispatch()
    const {addBookRes, setAddBookRes} = useContext(addBookContextApi)
    const {editBookRes, setEditBookRes} = useContext(editBookContextApi)
    const existingUser = JSON.parse(sessionStorage.getItem('existingUser'))
    console.log(existingUser);
    const [searchKey, setSearchKey] = useState("")
    console.log(searchKey);
  
    const [allBooks, setAllBooks] = useState([])
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
    },[searchKey, addBookRes, editBookRes])
    
    useEffect(() => {
      setLatestBooks(allBooks.slice(allBooks.length - 8, allBooks.length));
    }, [allBooks]);
    
    useEffect(() => {
      setLatestBooks1([...latestBooks].reverse());
    }, [latestBooks]);

     const deleteBook = async(bid)=>{
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        const result = await deleteBookAPI(bid,reqHeader)
        console.log(result);
        getAllBooks()
        alert('Book deleted successfully')
      }
     }

  return (
    <div style={{backgroundColor:'rgba(244,222,203,0.7)'}}>
      <Header/>
      <div className='mx-5 pt-3 pb-2 rounded text-center mt-5' style={{backgroundColor:'rgb(168,126,98)'}}>
          <h4 style={{color:'white'}}>New Arrivals</h4>
      </div>
      <div className='d-flex justify-content-evenly mt-5 pt-2'>
        <input style={{width:'350px', paddingBlock:'5px', paddingInline:'15px', border:'1px solid rgb(176,113,84)'}} onChange={e=>setSearchKey(e.target.value)} type="text" placeholder='Search your books' className='form-control'/>
      </div>
      <div className='text-center mt-1 mb-5 py-4'>
        <div style={{display:'flex',flexWrap:'wrap'}} className="row1 my-5 mx-4">
        { 
        latestBooks1.length>0?latestBooks1.map((item,index)=>(
          <div style={{ width: '205px', backgroundColor:'white', border:'2px solid rgb(176,113,84)'}} key={index} className="p-2 mx-5 mt-4 mb-5 text-center shadow">
            <Link to={`/dashboard/viewbook/${item._id}`}><img src={item?`${baseUrl}/uploads/${item.bookImage}`:'empty image'} alt="" /></Link>
            <h6 style={{color: 'rgb(58,35,23)'}} className='mt-4 mb-2'>{item?.title}</h6>
            <p className='mb-4' style={{ fontSize: '15px', color: 'rgb(176,113,84)' }}>{item.author}</p>
            <div style={{backgroundColor:'white'}} className='d-flex justify-content-evenly mt-3'>
            <p className='text-danger fw-bolder'>&#x20B9; {item.price}</p>
            {
              existingUser.role=='admin'?
              <div className='d-flex'>
                <EditBooks book={item}/>
                <button style={{width:'30px', height:'30px', paddingInline:'10px', paddingTop:'5px',backgroundColor: 'rgb(58,35,23)', color:'white'}} onClick={()=>deleteBook(item._id)} className='btn mx-3'><i class="fa-solid fa-trash"></i></button>
              </div>
              :<button onClick={()=>dispatch(addToCart(item))} style={{width:'30px', height:'30px', paddingInline:'5px', paddingTop:'7px',backgroundColor: 'rgb(58,35,23)', color:'white'}} className='btn'><i className='fa-solid fa-shopping-cart'></i></button>
            }
            </div>
          </div>
        )):<div>No books found</div>
      }
        </div>
      </div>   
    </div>
  )
}

export default NewArrivals