import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Pages/Home';
import Auth from './Pages/Auth';
import Dashboard from './Pages/Dashboard';
import PageNotFound from './Pages/PageNotFound';
import ViewBook from './Pages/ViewBook';
import Cart from './Pages/Cart';
import Orders from './Pages/Orders';
import Users from './Pages/Users';
import NewArrivals from './Pages/NewArrivals';
import AllOrders from './Components/AllOrders';
import AllUsersOrders from './Pages/AllUsersOrders';
import OrderPlaced from './Pages/OrderPlaced';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Auth/>} />
        <Route path='/register' element={<Auth register/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/dashboard/viewbook/:id' element={<ViewBook/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/orders' element={<Orders/>} />
        {/* view all orders of all users */}
        <Route path='/orders/all-users' element={<AllUsersOrders/>} />
        <Route path='/users' element={<Users/>} />
        <Route path='/newarrivals' element={<NewArrivals/>} />
        {/* view all orders of a user */}
        <Route path='/all-users-orders/:id' element={<AllOrders/>} />
        <Route path='/order-placed' element={<OrderPlaced/>}/>
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;