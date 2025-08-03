import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Placeorder from './pages/Placeorder'
import About from './pages/About'
import Contact from './pages/contact'
import Login from './pages/Login'
import Orders from './pages/Orders'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import SearchBar from './component/SearchBar'
import { ToastContainer } from "react-toastify";
import { useContext, useEffect } from 'react'
import { shopContext } from './context/ShopContext'
import axios from 'axios'
import WebLoading from './component/WebLoading'

function App() {
  
  const { getme, fetchProducts, fetchSearch ,webDataLoading } = useContext(shopContext); 
  

  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    getme();
    fetchProducts();
    fetchSearch();
  }, []);


  return (
    <>
      {webDataLoading ? (
        <div className='h-screen flex justify-center items-center'>
          <WebLoading />
        </div>
      ) : (
        <>
          <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
            <ToastContainer autoClose={1000} position="top-center" />
            <Navbar />
            <SearchBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/placeorder" element={<Placeorder />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
            <Footer />
          </div>
        </>
      )}
    </>
  );
}

export default App
