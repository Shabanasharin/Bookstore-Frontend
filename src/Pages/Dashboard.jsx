import React, { useContext, useEffect, useState } from 'react';
import AddBooks from '../Components/AddBooks';
import { allBooksAPI, deleteBookAPI } from '../services/allAPIs';
import { baseUrl } from '../services/baseUrl';
import EditBooks from '../Components/EditBooks';
import { addBookContextApi, editBookContextApi } from '../ContextAPI/ContextShare';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Redux/Slice/cartSlice';
import Header from '../Components/Header';

function Dashboard() {
  const dispatch = useDispatch()
  const { addBookRes, setAddBookRes } = useContext(addBookContextApi)
  const { editBookRes, setEditBookRes } = useContext(editBookContextApi)
  const existingUser = JSON.parse(sessionStorage.getItem('existingUser')) || {};
  const [searchKey, setSearchKey] = useState("")
  const [allBooks, setAllBooks] = useState([])

  // Fetch all books from API
  const getAllBooks = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await allBooksAPI(searchKey, reqHeader)
        if (result.status === 201) {
          setAllBooks(result.data || []); // Ensure result.data is not null
        } else {
          alert("Failed to get books");
        }
      } catch (err) {
        alert("Error getting books: " + err.message);
      }
    }
  }

  useEffect(() => {
    getAllBooks();
  }, [searchKey, addBookRes, editBookRes])

  // Delete a book by ID
  const deleteBook = async (bid) => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      try {
        await deleteBookAPI(bid, reqHeader);
        getAllBooks(); // Refresh book list after deletion
        alert('Book deleted successfully.');
      } catch (error) {
        alert('Failed to delete book: ' + error.message);
      }
    }
  }

  // Render books grouped by genre
  const renderBooksByGenre = () => {
    const booksByGenre = {};
    allBooks.forEach(book => {
      if (!booksByGenre[book.genre]) {
        booksByGenre[book.genre] = [];
      }
      booksByGenre[book.genre].push(book);
    });

    return Object.entries(booksByGenre).map(([genre, books]) => (
      <div key={genre}>
        <div className='mx-5 pt-3 pb-2 rounded' style={{backgroundColor:'rgb(168,126,98)'}}>
          <h3 style={{color:'white'}}>{genre}</h3>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }} className="row1 my-5 mx-4">
          {books.map((item, index) => (
            <div style={{ width: '205px', backgroundColor:'white', border:'2px solid rgb(176,113,84)'}} key={index} className="p-2 mx-5 mt-4 mb-5 text-center shadow">
              <Link to={`/dashboard/viewbook/${item._id}`}><img src={item ? `${baseUrl}/uploads/${item.bookImage}` : 'empty image'} alt="" /></Link>
              <h6 style={{color: 'rgb(58,35,23)'}} className='mt-4 mb-2'>{item?.title}</h6>
              <p className='mb-4' style={{ fontSize: '15px', color: 'rgb(176,113,84)' }}>{item.author}</p>
              <div style={{backgroundColor:'white'}} className='d-flex justify-content-evenly mt-3'>
                <p className='text-danger fw-bolder'>{item.availability > 0 ? `₹ ${item.price}` : 'Sold Out'}</p>
                {existingUser.role === 'admin' ? (
                  <div className='d-flex'>
                    <EditBooks book={item} />
                    <button style={{ width: '30px', height: '30px', paddingInline: '10px', paddingTop: '5px',backgroundColor: 'rgb(58,35,23)', color:'white'}} onClick={() => deleteBook(item._id)} className='btn mx-3'><i className="fa-solid fa-trash"></i></button>
                  </div>
                ) : (
                  <button disabled={item.availability <= 0} onClick={() => dispatch(addToCart(item))} style={{ width: '30px', height: '30px', paddingInline: '5px', paddingTop: '7px',backgroundColor: 'rgb(58,35,23)', color:'white'}} className='btn'><i className='fa-solid fa-shopping-cart'></i></button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  }

  return (
    <div style={{backgroundColor:'rgba(244,222,203,0.7)'}}>
      <Header />
      <div id='d2' className='d-flex justify-content-evenly my-5 pt-5 pb-2'>
        <h5 className='text-center'>Welcome <span>{existingUser.username}</span></h5>
        <input style={{ width: '350px',paddingBlock:'5px', paddingInline:'15px', border:'1px solid rgb(176,113,84)' }} onChange={e => setSearchKey(e.target.value)} type="text" placeholder='Search your books' className='form-control' />
        {existingUser.role === 'admin' && <AddBooks />}
      </div>
      <div className='text-center my-5 py-4'>
        {/* Render books grouped by genre */}
        {renderBooksByGenre()}
      </div>
    </div>
  )
}

export default Dashboard;
