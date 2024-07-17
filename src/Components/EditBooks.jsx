import React, { useContext, useEffect, useState } from 'react';
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
import { baseUrl } from '../services/baseUrl';
import { editBookContextApi } from '../ContextAPI/ContextShare';
import { updateBookAPI } from '../services/allAPIs';

function EditBooks({book}) {
    const {editBookRes,setEditBookRes} = useContext(editBookContextApi);
    const [basicModal, setBasicModal] = useState(false);
    const toggleOpen = () => setBasicModal(!basicModal);

    const [token,setToken] = useState("")
    useEffect(()=>{
      if(sessionStorage.getItem('token')){
        setToken(sessionStorage.getItem('token'))
      }
    },[])

    const [bookDetails, setBookDetails] = useState({
      id:book._id, title:book.title, author:book.author, genre:book.genre, price:book.price, availability:book.availability, description:book.description, bookImage:""
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
    
    const bookEdit=async()=>{
      const{id,title,author,genre,price,availability,description,bookImage}= bookDetails

        const reqBody = new FormData()
        reqBody.append("title", title)
        reqBody.append("author", author)
        reqBody.append("genre",genre)
        reqBody.append("price",price)
        reqBody.append("availability",availability)
        reqBody.append("description",description)
        preview?reqBody.append("bookImage",bookImage):reqBody.append("bookImage",book.bookImage)
        if(preview){
            const reqHeader = {
              "Content-Type":"multipart/form-data",
              "Authorization":`Bearer ${token}`
            }
            const result = await updateBookAPI(id,reqBody,reqHeader)
            console.log(result);
            if(result.status==200){
              console.log(result.data);
              setEditBookRes(result.data)
              toggleOpen()
              alert('Book updated successfully')
            }
            else{
              console.log(result.response.data);
              setEditBookRes(result.response.data)
            }
          }
          else{
            const reqHeader = {
              "Content-Type":"application/json",
              "Authorization":`Bearer ${token}`
            }
            const result = await updateBookAPI(id,reqBody,reqHeader)
            console.log(result);
            if(result.status==200){
              console.log(result.data);
              setEditBookRes(result.data)
              toggleOpen()
              alert('Book updated successfully');
            }
            else{
              console.log(result.response.data);
              setEditBookRes(result.response.data)
            }
          }
    }
  return (
    <div>
    <button style={{width:'30px', height:'30px', paddingInline:'10px', paddingTop:'5px',backgroundColor: 'rgb(58,35,23)', color:'white'}} onClick={toggleOpen} className='btn'><i class="fa-solid fa-pen-to-square"></i></button>
      <MDBModal open={basicModal} setOpen={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader style={{backgroundColor:'rgba(244,222,203,0.7)'}}>
              <MDBModalTitle style={{color:'rgb(58,35,23)', fontWeight:'bold'}}>Edit book details</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className='d-flex justify-content-evenly'>
              <label className='mx-3'>
                <input onChange={e=>setBookDetails({...bookDetails,bookImage:e.target.files[0]})} type="file" style={{display:'none'}} />
                <img width={'180px'} src={preview?preview:`${baseUrl}/uploads/${book.bookImage}`} alt="" />
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
              <MDBBtn style={{backgroundColor: 'rgb(58,35,23)', color:'white'}} onClick={bookEdit}>Update Book</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  )
}

export default EditBooks