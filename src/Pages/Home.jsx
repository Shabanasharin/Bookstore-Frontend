import React, { useEffect, useState } from 'react'
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBCollapse,
    MDBIcon
  } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { homeBooksAPI } from '../services/allAPIs';
import { baseUrl } from '../services/baseUrl';

function Home() {
    const [openNav, setOpenNav] = useState(false);
    const [latestBooks,setLatestBooks] = useState([])

    //api call to get home books
    const [homeBook,setHomeBook] = useState([])
    const getHomeBooks = async()=>{
        const result = await homeBooksAPI()
        console.log(result);
        if(result.status==201){
            setHomeBook(result.data)
            console.log(homeBook)
            setLatestBooks(result.data.slice(result.data.length-4,result.data.length))
            console.log(latestBooks);
        }
        else{
            console.log('API fetching book details failed');
        }
    }
    useEffect(()=>{
        getHomeBooks()
    },[])
  return (
    <div style={{backgroundColor:'rgba(244,222,203,0.7)'}}>
    <div>
      <MDBNavbar style={{boxShadow:'none'}} expand='lg' light bgColor='light'>
      <MDBContainer fluid>
      <MDBNavbarBrand className='ms-2' style={{color:'rgb(75, 3, 3)'}} href='/'>
      <img src='https://cdn-icons-png.flaticon.com/512/2232/2232688.png'
              height='22'
              alt=''
              loading='lazy'
            />
        Bookshelf</MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenNav(!openNav)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar open={openNav}>
          <MDBNavbarNav className='d-flex justify-content-center'>
          </MDBNavbarNav>
          <Link to={'/login'}>
            <button style={{boxShadow:'none', color:'rgb(75, 3, 3)'}} className='btn'><i class="fa-solid fa-user"></i></button>
          </Link>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    </div>
        <div>
        <MDBCarousel style={{border:'2px solid rgb(176,113,84)'}} showControls showIndicators className='m-5'>
      <MDBCarouselItem itemId={1}>
        <img height={'430px'} src='https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1798&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='d-block w-100' alt='...' />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={2}>
        <img height={'430px'} src='https://c.wallhere.com/photos/c5/57/nature_grass_outdoors_poetry_books_literature_robertfrost_catcher-793160.jpg!d' className='d-block w-100' alt='...' />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={3}>
        <img height={'430px'} src='https://wallpaperaccess.com/full/3853708.jpg' className='d-block w-100' alt='...' />
      </MDBCarouselItem>
    </MDBCarousel>
        </div>
        <div className='text-center mb-4 mt-5 py-4'>
            <div className='mx-5 pt-3 pb-2 rounded text-center mt-3 mb-5' style={{backgroundColor:'rgb(168,126,98)'}}>
              <h4 style={{color:'white'}}>New Arrivals</h4>
            </div>
            <div id='d1' className="row1 d-flex m-5 pt-4">
                {
                    latestBooks.length>0?latestBooks.map((item)=>(
                        <div style={{ width: '200px', height:'270px', backgroundColor:'white', border:'2px solid rgb(176,113,84)', paddingInline:'5px', paddingBlock:'7px'}} className="coll mx-5">
                          <Link to={'/login'}>
                            <img src={item?`${baseUrl}/uploads/${item.bookImage}`:'empty image'} alt="" />
                          </Link>
                        </div> 
                    )):'no book'
                }
            </div>
        </div>
        <div className='text-center mb-5'>
            <div className='mx-5 pt-3 pb-2 rounded text-center mb-5' style={{backgroundColor:'rgb(168,126,98)'}}>
              <h4 style={{color:'white'}}>Featured Authors</h4>
            </div>
            <marquee className='my-5'>
                <div className="marquee-container row2 d-flex">
                    <div className="col">
                        <img className="marquee-image" src="https://sparkthemagazine.com/wp-content/uploads/2013/09/Meghna_pant-e1418319526873.jpg" alt="" />
                        <h6>Meghna Pant</h6>
                    </div>
                    <div className="col">
                        <img className="marquee-image" src="https://www.apollo-magazine.com/wp-content/uploads/2021/11/Web-lead-image_FINAL_Dostoevsky-.jpg" alt="" />
                        <h6>Fyodor Dostoevsky</h6>
                    </div>
                    <div className="col">
                        <img className="marquee-image" src="https://sc0.blr1.cdn.digitaloceanspaces.com/thumbnail/187929-rtyijxpqpe-1678769811.jpg" alt="" />
                        <h6>Tarun Mehrishi</h6>
                    </div>
                    <div className="col">
                        <img className="marquee-image" src="https://cdn.britannica.com/51/12251-050-D5F09630/Arthur-Conan-Doyle-detail-portrait-HL-Gates-1927.jpg" alt="" />
                        <h6>Arthur Conan Doyle</h6>
                    </div>
                    <div className="col">
                        <img className="marquee-image" src="https://m.media-amazon.com/images/M/MV5BNzc4ODk0ZWYtM2YyNy00M2Y1LTlhMGUtOTM4MjI3ZmY4YTNlL2ltYWdlXkEyXkFqcGdeQXVyNDUxMzI5NTU@._V1_.jpg" alt="" />
                        <h6>Fredrik Backman</h6>
                    </div>
                    <div className="col">
                        <img className="marquee-image" src="https://upload.wikimedia.org/wikipedia/commons/0/00/Dr._Joseph_Murphy_.jpg" alt="" />
                        <h6>Joseph Murphy</h6>
                    </div>
                    <div className="col">
                        <img className="marquee-image" src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Dickens_Gurney_head.jpg" alt="" />
                        <h6>Charles Dickens</h6>
                    </div>
                </div>
            </marquee>
        </div>
    </div>
  )
}

export default Home