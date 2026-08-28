import React, { useState } from 'react';
import axios from 'axios';
import { backendurl } from '../../config';
import { toast } from 'react-toastify';
import { FaUserShield, FaKey, FaCopy, FaInfoCircle } from 'react-icons/fa';

const Login = ({ setToken, setTokenAdmin, setAdminData }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const fillSuperAdmin = () => {
    setUsername("admin");
    setPassword("secret123");
    toast.info("Filled Super Admin credentials!");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const response = await axios.post(
        `${backendurl}/api/auth/admin`,
        {
          username,
          password,
        }
      );

      const token = response.data?.token;
      if (token) {
        if (response.data.admin && setAdminData) {
          setAdminData(response.data.admin);
        }
        if (setTokenAdmin) {
          setTokenAdmin(true);
        }
        setToken(token);
        localStorage.setItem("token", token);
        toast.success(response.data.message || "Login successful!");
        setLoginLoading(false);
      } else {
        console.warn("No token received from server");
        toast.error(response.data?.message || "Login failed!");
        setLoginLoading(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
      console.error(
        "Login error:",
        error.response?.data?.message || error.message
      );
    }
    setLoginLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 max-w-md w-full border border-gray-200">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center mx-auto mb-3">
            <FaUserShield className="text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
          <p className="text-xs text-gray-500 mt-1">Sign in as Super Admin or Staff Member</p>
        </div>

        {/* Testing & Review Credentials Box */}
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-center gap-2 text-amber-900 font-semibold text-xs uppercase tracking-wider mb-2">
            <FaInfoCircle className="text-amber-600 text-sm" />
            Testing & Review Credentials
          </div>
          <button
            type="button"
            onClick={fillSuperAdmin}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white hover:bg-amber-100/60 border border-amber-200 text-amber-900 font-semibold text-xs rounded-lg transition cursor-pointer shadow-2xs"
          >
            <FaKey className="text-amber-600 text-xs" />
            Click to Auto-fill Credentials
          </button>
          <div className="mt-2 text-center">
            <span className="text-[11px] text-gray-500">Or use your created Staff credentials below</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Username or Staff Email
            </label>
            <input
              type="text"
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-black transition"
              placeholder="e.g. admin or staff_username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-black transition"
              placeholder="Enter Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="mt-2 w-full py-2.5 px-4 rounded-lg text-white bg-black hover:bg-gray-800 transition font-medium text-sm cursor-pointer disabled:opacity-50 shadow-xs"
            type="submit"
            disabled={loginLoading}
          >
            {loginLoading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;