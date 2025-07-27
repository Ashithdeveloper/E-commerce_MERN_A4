import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { shopContext } from "../context/ShopContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import { backend_API } from "../config.js";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {
    setShowSearch,
    showSearch,
    setUserLogin,
    userLogin,
    fetchSearch,
    productCount,
    showCartsData,
  } = useContext(shopContext);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const res = await axios.post(`${backend_API}/api/auth/logout`, {});
      const data = res.data;
      localStorage.removeItem("token");
      showCartsData();
      toast.success(data.message);
      setUserLogin(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const searchHandler = () => {
    navigate("/collection");
    setShowSearch(!showSearch);
    fetchSearch();
  };
  return (
    <div className="flex justify-between items-center py-5 font-medium">
      <Link to="/">
        <h1 className="text-[18px] sm:text-3xl font-bold navLogo ">A4-FashionStore</h1>
      </Link>
      <ul className="hidden sm:flex gap-5 text-lg text-gray-500">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-2/3 broder-none h-[2px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>Collection</p>
          <hr className="w-2/3 broder-none h-[2px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className="w-2/3 broder-none h-[2px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr className="w-2/3 broder-none h-[2px] bg-gray-700 hidden " />
        </NavLink>
      </ul>
      <div className="flex items-center gap-5">
        <img
          onClick={() => searchHandler()}
          src={assets.search_icon}
          alt=""
          className="w-5 cursor-pointer"
        />

        <div className="group relative">
          <Link to={`${userLogin ? "/" : "/login"}`}>
            <img
              className={`w-5 cursor-pointer ${
                userLogin ? "bg-green-400 rounded-[20%] px-1 py-1 w-6" : ""
              }`}
              src={assets.profile_icon}
              alt=""
            />
          </Link>
          {userLogin && (
            <div className="hidden group-hover:block absolute dropdown-menu right-0 pt-0 ">
              <div className="flex flex-col gap-2 w-36 py-2 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="p-2 hover:text-black">My Profile</p>
                <Link to='/orders'>
                  <p className="p-2 hover:text-black">Orders</p>
                </Link>
                <p className="p-2 hover:text-black" onClick={logout}>
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to={`${userLogin ? "/cart" : "/login"}`} className="relative">
          <img src={assets.cart_icon} alt="" className="w-5 min-w-5 mb-1" />
          <p className="absolute right-[-5px] bottom-[-4px] text-white leading-4 bg-red-600 w-4 h-4 flex items-center justify-center aspect-square rounded-full">
            {productCount}
          </p>
        </Link>
        <img
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
          onClick={() => setOpen(!open)}
        />
      </div>
      {/** mobile menu */}
      <div
        className={`absolute top-0 right-0 button-0 overflow-hidden bg-white transition-all ${
          open ? "w-full  " : "w-0 h-0"
        }  `}
      >
        <div className="flex flex-col text-gray-600 ">
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-4 p-3"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setOpen(!open)}
            className="py-2 pl-6 border "
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setOpen(!open)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => setOpen(!open)}
            className="py-2 pl-6 border"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setOpen(!open)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
