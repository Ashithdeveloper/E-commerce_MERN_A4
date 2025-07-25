import React from 'react'


import { toast } from 'react-toastify';

const Navbar = ({setToken , setTokenAdmin}) => {

  const logout = async()=>{
      try {
        
        localStorage.removeItem("token");
        setTokenAdmin(false);
        setToken("");
        toast.success("Logout successful!");
      } catch (error) {
        console.log(error);
        toast.error("Logout failed!");
      }
  }
  return (
    <div className="flex items-center justify-between py-2 px-[4%] ">
      <h1 className="text-2xl font-bold navLogo ">A4-FashionStore</h1>
      <button
        onClick={logout}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar