
import { useContext, useState } from 'react'
import { Form } from 'react-router-dom'
import { toast } from 'react-toastify'
import { shopContext } from '../context/ShopContext'
import axios from 'axios'
import { backend_API } from '../config'


const Login = () => {
  const [ currentState , setCurrentState  ] = useState("Sign up")
  const [ username , setUsername] = useState("");
  const [ email , setEmail] = useState("");
  const [ password , setPassword] = useState("");
  const [ fullname , setFullName] = useState("");
  const { navigate, setUserLogin } = useContext(shopContext);
  
  const onSubmit = async (e) => {
    e.preventDefault();
    if (currentState === "Sign up") {
      const data = {
        username,
        email,
        password,
        fullname,
      };
      console.log(data);
      try {
        const response = await axios.post(
          `${backend_API}/api/auth/signup`,
          data
        );
        const res = response.data;
        const token = res.token;
        localStorage.setItem("token", token);

        setUsername("");
        setEmail("");
        setPassword("");
        setFullName("");
        navigate("/");
        setUserLogin(true);
        toast.success("Signup successful");
      } catch (error) {
        console.error("Network or server error:", error);
        toast.error("Something went wrong. Please try again later.");
      }
      return;
    }
    if( currentState === "Login"){
      const data = {
        username,
        password,
      };
      console.log(data);
      try {
        const response = await axios.post(
          `${backend_API}/api/auth/login`,
           data
        );
        const res = response.data;
        const token = res.token;
        localStorage.setItem("token", token);
        setUsername("");
        setPassword("");
        setUserLogin(true);
        navigate("/");
        toast.success("login successful");
      } catch (error) {
        console.error("Network or server error:", error);
        toast.error("Something went wrong. Please try again later.");
      }
    }
    return
    }
  
  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 text-gray-800">
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="text-3xl prata-regular">{currentState}</p>
          <hr className="border-none h-[1.5px] bg-gray-800 w-8" />
        </div>
        <input
          type="text"
          className="border py-2 px-3 mb-3 w-full mt-4 border-gray-800 "
          placeholder="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
          {
          currentState === "Sign up" && (
            <input
            type="text"
            className="border py-2 px-3 mb-3 w-full border-gray-800 "
            placeholder="Full Name"
            required
            onChange={(e) => setFullName(e.target.value)}
          />
          )
        }
        {
          currentState === "Sign up" && (
            <input
            type="email"
            className="border py-2 px-3 mb-3 w-full border-gray-800 "
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          )
        }
      
        
        <input
          type="password"
          className="border border-gray-800 py-2 px-3 w-full"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='w-full flex justify-between texxt-sm mt-[8px]'>
          <p className='cursor-pointer'>Forgot Password ?</p>
          {
            currentState === "Login" ? (
              <p className='cursor-pointer' onClick={() => setCurrentState("Sign up")}>
                Don't have an account ?
              </p>
            ) : (
              <p className='cursor-pointer' onClick={() => setCurrentState("Login")}>Already have an account ?</p>
            )
          }
        </div>
        <button 
          className="bg-red-500 text-white py-2 px-3 w-50 mt-5 hover:bg-green-500 hover:scale-110 transition duration-300 ease-in-out hover:rounded-2xl"
          type="submit"
        >
          {currentState === "Login" ? "Login" : "Sign up"}
        </button>
      </form>
    </>
  );
}

export default Login