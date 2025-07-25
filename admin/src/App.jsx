
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AddProduct from './component/AddProduct'
import ListProduct from './component/ListProduct'
import OrderList from './component/OrderList'
import SideBar from './component/sideBar'
import Navbar from './component/Navbar'
import { useEffect, useState } from 'react'
import Login from './component/Login/Login'
import { backendurl } from './config'
import axios from 'axios'




const App = () => {

  const [ token , setToken ] = useState("");
  const [ tokenAdmin , setTokenAdmin ] = useState(false);
useEffect(() => {
const tokenFromStorage = localStorage.getItem("token");
if (tokenFromStorage) {
  setToken(tokenFromStorage);
  console.log(tokenFromStorage);
  getme(tokenFromStorage); 
}
},[token]);

const getme = async(token)=>{
  try {
    console.log(token);
    const res = await axios.get(`${backendurl}/api/auth/getadmin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.success === true) {
      setTokenAdmin(true);
    }
    if (res.data.success === false) {
      setTokenAdmin(false);
    }
  } catch (error) {
    console.log(error);
    setTokenAdmin(false);
  }
}

 


  return (
    <div className="border-4 border-red-500 max-w-[1200px] mx-auto">
      <div className="bg-gray-50 max-h-screen">
        {tokenAdmin === true ? (
          <>
            <Navbar
              setToken={setToken}
              setTokenAdmin={setTokenAdmin}
              getme={getme}
            />
            <hr />

            <div className="flex w-full">
              <SideBar />
              <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
                <Routes>
                  <Route path="/" element={<AddProduct token={token} />} />
                  <Route path="/list" element={<ListProduct token={token} />} />
                  <Route path="/orders" element={<OrderList token={token} />} />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <Login setToken={setToken} setTokenAdmin={setTokenAdmin} />
        )}
      </div>
    </div>
  );
};

export default App