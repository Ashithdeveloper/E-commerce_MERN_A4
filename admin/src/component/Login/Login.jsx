import React, { useState } from 'react'
import axios from 'axios'

import { backendurl } from '../../config';
import { toast } from 'react-toastify';


const Login = ({setToken}) => {
  const [ username , setUsername] = useState("");
  const [ password , setPassword] = useState("");
  
  
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(username, password);
      const response = await axios.post(
        `${backendurl}/api/auth/admin`,
        {
          username,
          password,
        }
      );

   
    const token = response.data?.token;
    if (token) {
   
      setToken(token);
      localStorage.setItem("token", token);
      toast.success("Login successful!");
    } else {
      console.warn("No token received from server");
      toast.error(response.data?.message || "Login failed!");
    }
    } catch (error) {
      toast.error("Login failed!");
      console.error(
        "Login error:",
        error.response?.data?.message || error.message
      );
    }
  };
  
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className="text-2x1 font-bold mb-4 ">Admin Panel</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-3 min-w-75">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Admin_UserName :
            </p>
            <input
              type="text"
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none "
              placeholder="Enter Admin_UserName"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3 min-w-75">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Admin_Password :
            </p>
            <input
              type="text"
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none "
              placeholder="Enter Admin_Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login