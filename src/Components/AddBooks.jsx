import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import { addBookAPI } from '../services/allAPIs';


function AddBooks() {
    const [basicModal, setBasicModal] = useState(false);
    const toggleOpen = () => setBasicModal(!basicModal);
    const [token,setToken] = useState("")
    useEffect(()=>{
      if(sessionStorage.getItem('token')){
        setToken(sessionStorage.getItem('token'))
      }
    },[])

    const [bookDetails, setBookDetails] = useState({
      title:"",author:"",genre:"",price:0,availability:0,description:"",bookImage:""
    })
    
    //to hold image file data converted into url
    const [preview,setPreview] = useState("")
    useEffect(()=>{
      if(bookDetails.bookImage){
        setPreview(URL.createObjectURL(bookDetails.bookImage))
      }
    },[bookDetails.bookImage])
    console.log(preview);
    console.log(bookDetails);

    const bookAdd=async()=>{
      const{title,author,genre,price,availability,description,bookImage}= bookDetails
      if(!title||!author||!genre||!price||!availability||!description||!bookImage){
        alert('Please fill all details')
      }
      else{
        //api call
        const reqBody = new FormData()
        reqBody.append("title", title)
        reqBody.append("author", author)
        reqBody.append("genre",genre)
        reqBody.append("price",price)
        reqBody.append("availability",availability)
        reqBody.append("description",description)
        reqBody.append("bookImage",bookImage)
        // let reqHeader
        const reqHeader = {
          //multipart/form-data is for file data and application/json is for text input
          "Content-Type":"multipart/form-data", //it indicates the request contains an image file
          "Authorization":`Bearer ${token}` //to send token fom client side to server side
        }
      const result = await addBookAPI(reqBody,reqHeader);
      console.log(result);
      if(result.status===200){
        // toast.success('Project added successfully')
        alert('Book added successfully')
        // setAddProjectRes(result.data) //contextAPI state value assigned
        console.log(result.data);
        // handleClose()
        toggleOpen()
        setBookDetails({
          title:"",author:"",genre:"",price:0,availability:0,description:"",bookImage:""
        })
        setPreview("")
        // getAllBooks()
        window.location.reload();
      }
      else{
        console.log(result.response.data);
      }
    }
    }
  return (
    <div>
      <button style={{backgroundColor: 'rgb(58,35,23)', color:'white'}} onClick={toggleOpen} className='btn'>Add Books</button>
      <MDBModal open={basicModal} setOpen={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader style={{backgroundColor:'rgba(244,222,203,0.7)'}}>
              <MDBModalTitle style={{color:'rgb(58,35,23)', fontWeight:'bold'}}>Add book details</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className='d-flex justify-content-evenly'>
              <label className='mx-3'>
                <input onChange={e=>setBookDetails({...bookDetails,bookImage:e.target.files[0]})} type="file" style={{display:'none'}} />
                <img width={'180px'} height={'100%'} src={preview?preview:'https://i.postimg.cc/y8Tk2r9T/Book-Cover.png'} alt="" />
              </label>
              <div>
                <input value={bookDetails.title} onChange={e=>setBookDetails({...bookDetails,title:e.target.value})} type="text" placeholder='Title' className='form-control mb-3'/>
                <input value={bookDetails.author} onChange={e=>setBookDetails({...bookDetails,author:e.target.value})} type="text" placeholder='Author' className='form-control mb-3'/>
                <input value={bookDetails.genre} onChange={e=>setBookDetails({...bookDetails,genre:e.target.value})} type="text" placeholder='Genre' className='form-control mb-3'/>
                <input value={bookDetails.price==0?'':bookDetails.price} onChange={e=>setBookDetails({...bookDetails,price:e.target.value})} type="text" placeholder='Price' className='form-control mb-3'/>
                <input value={bookDetails.availability==0?'':bookDetails.availability} onChange={e=>setBookDetails({...bookDetails,availability:e.target.value})} type="text" placeholder='Availability' className='form-control mb-3'/>
                <input value={bookDetails.description} onChange={e=>setBookDetails({...bookDetails,description:e.target.value})} type="text" placeholder='Description' className='form-control mb-3'/>
              </div>
            </div>
            </MDBModalBody>
            <MDBModalFooter style={{backgroundColor:'rgba(244,222,203,0.7)'}}>
              <MDBBtn style={{backgroundColor: 'rgb(58,35,23)', color:'white'}} onClick={bookAdd}>Add Book</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  )
}

export default AddBooks