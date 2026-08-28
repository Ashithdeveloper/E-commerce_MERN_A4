import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/admin_assets/assets';
import { FaUserShield } from 'react-icons/fa';

const SideBar = ({ adminData }) => {
  const isSuperAdmin = adminData?.role === "superadmin" || (adminData?.role === "admin" && !adminData?.id);
  const permissions = adminData?.permissions || {};

  const canAddProduct = isSuperAdmin || !!permissions.addProduct;
  const canListProducts = isSuperAdmin || !!permissions.listProducts;
  const canManageOrders = isSuperAdmin || !!permissions.orderManagement;
  const canManageStaff = isSuperAdmin;

  return (
    <div className="w-[18%] min-h-screen border-r-2 border-gray-200 bg-white">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        {canAddProduct && (
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-3 rounded-l transition ${
                isActive ? "bg-gray-100 font-semibold border-black" : "hover:bg-gray-50"
              }`
            }
            to="/"
          >
            <img src={assets.add_icon} className="w-5 h-5" alt="" />
            <p className="hidden md:block">Add Product</p>
          </NavLink>
        )}

        {canListProducts && (
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-3 rounded-l transition ${
                isActive ? "bg-gray-100 font-semibold border-black" : "hover:bg-gray-50"
              }`
            }
            to="/list"
          >
            <img src={assets.order_icon} className="w-5 h-5" alt="" />
            <p className="hidden md:block">List Items</p>
          </NavLink>
        )}

        {canManageOrders && (
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-3 rounded-l transition ${
                isActive ? "bg-gray-100 font-semibold border-black" : "hover:bg-gray-50"
              }`
            }
            to="/orders"
          >
            <img src={assets.order_icon} className="w-5 h-5" alt="" />
            <p className="hidden md:block">Orders</p>
          </NavLink>
        )}

        {canManageStaff && (
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-3 rounded-l transition ${
                isActive ? "bg-gray-100 font-semibold border-black" : "hover:bg-gray-50"
              }`
            }
            to="/staff"
          >
            <FaUserShield className="w-5 h-5 text-gray-700" />
            <p className="hidden md:block">Manage Staff</p>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default SideBar;