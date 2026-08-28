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
      if (showCartsData) showCartsData();
      toast.success(data.message || "Logged out successfully");
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
    if (fetchSearch) fetchSearch();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100/80 transition-all">
      <div className="flex justify-between items-center py-4 px-2 sm:px-0">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-bold text-base shadow-xs group-hover:scale-105 transition">
            A4
          </div>
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
            Fashion<span className="text-gray-400 font-light">Store</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden sm:flex items-center gap-8 text-sm font-medium text-gray-600">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative py-1 transition hover:text-black ${
                isActive ? "text-black font-semibold" : ""
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>Home</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-full transition-all" />
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/collection"
            className={({ isActive }) =>
              `relative py-1 transition hover:text-black ${
                isActive ? "text-black font-semibold" : ""
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>Collection</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-full transition-all" />
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `relative py-1 transition hover:text-black ${
                isActive ? "text-black font-semibold" : ""
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>About</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-full transition-all" />
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `relative py-1 transition hover:text-black ${
                isActive ? "text-black font-semibold" : ""
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>Contact</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-full transition-all" />
                )}
              </>
            )}
          </NavLink>
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* Admin Panel Button */}
          <a
            href="https://e-commerce-mern-a4.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-200/80 px-3 py-1.5 rounded-full transition"
          >
            Admin Panel ↗
          </a>

          {/* Search Icon */}
          <button
            type="button"
            onClick={searchHandler}
            aria-label="Search products"
            className="p-1.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition cursor-pointer"
          >
            <img src={assets.search_icon} alt="Search" className="w-5 h-5" />
          </button>

          {/* User Profile / Dropdown */}
          <div className="group relative">
            <Link
              to={userLogin ? "/orders" : "/login"}
              className="p-1.5 block text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition"
            >
              <div className="relative">
                <img
                  className={`w-5 h-5 transition ${
                    userLogin ? "ring-2 ring-emerald-500 rounded-full p-[1px]" : ""
                  }`}
                  src={assets.profile_icon}
                  alt="Profile"
                />
                {userLogin && (
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full ring-1 ring-white" />
                )}
              </div>
            </Link>

            {userLogin && (
              <div className="hidden group-hover:block absolute right-0 top-full pt-2 z-50">
                <div className="flex flex-col w-44 py-2 bg-white text-gray-700 text-xs font-medium rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fadeIn">
                  <div className="px-4 py-2 border-b border-gray-100 bg-gray-50/50">
                    <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Account</p>
                    <p className="text-gray-800 font-bold truncate">Active User</p>
                  </div>
                  <Link
                    to="/orders"
                    className="px-4 py-2.5 hover:bg-gray-50 hover:text-black flex items-center gap-2 transition"
                  >
                    <span>📦</span> My Orders
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 flex items-center gap-2 transition cursor-pointer"
                  >
                    <span>🚪</span> Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart Icon & Badge */}
          <Link
            to={userLogin ? "/cart" : "/login"}
            className="relative p-1.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition"
          >
            <img src={assets.cart_icon} alt="Cart" className="w-5 h-5" />
            {productCount > 0 && (
              <span className="absolute top-0 right-0 -mr-1 -mt-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {productCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="sm:hidden p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition cursor-pointer"
            aria-label="Toggle menu"
          >
            <img src={assets.menu_icon} className="w-5 h-5" alt="Menu" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 sm:hidden bg-black/40 backdrop-blur-xs transition-opacity" onClick={() => setOpen(false)}>
          <div
            className="fixed top-0 right-0 bottom-0 w-3/4 max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex justify-between items-center pb-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-black text-white rounded-md flex items-center justify-center font-bold text-sm">
                    A4
                  </div>
                  <span className="font-bold text-gray-900">FashionStore</span>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-gray-900 p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex flex-col gap-1 py-6">
                <NavLink
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl font-medium text-sm transition ${
                      isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                  to="/"
                >
                  Home
                </NavLink>
                <NavLink
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl font-medium text-sm transition ${
                      isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                  to="/collection"
                >
                  Collection
                </NavLink>
                <NavLink
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl font-medium text-sm transition ${
                      isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                  to="/about"
                >
                  About
                </NavLink>
                <NavLink
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl font-medium text-sm transition ${
                      isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                  to="/contact"
                >
                  Contact
                </NavLink>
                {userLogin && (
                  <NavLink
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl font-medium text-sm transition ${
                        isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                    to="/orders"
                  >
                    My Orders
                  </NavLink>
                )}
              </div>
            </div>

            {/* Drawer Bottom */}
            <div className="pt-6 border-t border-gray-100">
              <a
                href="https://e-commerce-mern-a4.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center w-full py-2.5 px-4 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl transition"
              >
                Go to Admin Portal ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
