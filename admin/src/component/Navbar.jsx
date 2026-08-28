import React from 'react';
import { toast } from 'react-toastify';
import { FaUserShield, FaUserTie } from 'react-icons/fa';

const Navbar = ({ setToken, setTokenAdmin, adminData, setAdminData }) => {
  const logout = async () => {
    try {
      localStorage.removeItem("token");
      setTokenAdmin(false);
      setToken("");
      if (setAdminData) setAdminData(null);
      toast.success("Logout successful!");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed!");
    }
  };

  const role = adminData?.role || "admin";
  const isSuperAdmin = role === "superadmin";

  return (
    <div className="flex items-center justify-between py-3 px-[4%] bg-white border-b border-gray-200">
      <div className="flex items-center gap-3">
        <h1 className="text-xl md:text-2xl font-bold navLogo text-gray-900 tracking-tight">
          A4-FashionStore
        </h1>
        <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
          Control Panel
        </span>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {adminData && (
          <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1 text-xs">
            {isSuperAdmin ? (
              <span className="flex items-center gap-1 font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                <FaUserShield className="text-amber-600" /> Super Admin
              </span>
            ) : role === "admin" ? (
              <span className="flex items-center gap-1 font-semibold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                <FaUserShield className="text-indigo-600" /> Admin
              </span>
            ) : (
              <span className="flex items-center gap-1 font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                <FaUserTie className="text-blue-600" /> Manager
              </span>
            )}
            <span className="font-medium text-gray-700 hidden md:inline">
              {adminData.fullname || adminData.username}
            </span>
          </div>
        )}

        <button
          onClick={logout}
          className="bg-black hover:bg-gray-800 text-white px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs font-medium transition cursor-pointer shadow-xs"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;