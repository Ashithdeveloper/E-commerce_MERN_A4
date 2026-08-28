
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import AddProduct from './component/AddProduct';
import ListProduct from './component/ListProduct';
import OrderList from './component/OrderList';
import AdminManagement from './component/AdminManagement';
import SideBar from './component/sideBar';
import Navbar from './component/Navbar';
import { useEffect, useState } from 'react';
import Login from './component/Login/Login';
import { backendurl } from './config';
import axios from 'axios';
import Loading from './component/Loading';
import { FaLock } from 'react-icons/fa';

const AccessDenied = ({ featureName = "this page" }) => (
  <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-gray-200 text-center shadow-xs">
    <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-4">
      <FaLock className="text-2xl" />
    </div>
    <h2 className="text-xl font-bold text-gray-800">Access Restricted</h2>
    <p className="text-sm text-gray-500 max-w-md mt-2">
      You do not have permission to access {featureName}. Please contact the Super Admin to request permission.
    </p>
  </div>
);

const App = () => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [tokenAdmin, setTokenAdmin] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [webDataLoading, setWebDataLoading] = useState(true);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      getme(tokenFromStorage);
    } else {
      setWebDataLoading(false);
    }
  }, []);

  const getme = async (authToken) => {
    try {
      setWebDataLoading(true);
      const res = await axios.get(`${backendurl}/api/auth/getadmin`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (res.data.success === true) {
        setTokenAdmin(true);
        setAdminData(res.data.admin);
      } else {
        setTokenAdmin(false);
        setAdminData(null);
      }
    } catch (error) {
      console.log(error);
      setTokenAdmin(false);
      setAdminData(null);
    } finally {
      setWebDataLoading(false);
    }
  };

  const isSuperAdmin =
    adminData?.role === "superadmin" || (adminData?.role === "admin" && !adminData?.id);
  const permissions = adminData?.permissions || {};

  const canAddProduct = isSuperAdmin || !!permissions.addProduct;
  const canListProducts = isSuperAdmin || !!permissions.listProducts;
  const canManageOrders = isSuperAdmin || !!permissions.orderManagement;

  return webDataLoading ? (
    <Loading />
  ) : (
    <div className="w-full">
      <div className="bg-gray-50 min-h-screen">
        {tokenAdmin ? (
          <>
            <Navbar
              setToken={setToken}
              setTokenAdmin={setTokenAdmin}
              adminData={adminData}
              setAdminData={setAdminData}
              getme={getme}
            />
            <hr className="border-gray-200" />
            <div className="flex w-full">
              <SideBar adminData={adminData} />

              <div className="w-[74%] min-w-0 mx-auto ml-[clamp(20px,4vw,60px)] my-8 text-gray-600 text-base pr-4">
                <Routes>
                  <Route
                    path="/"
                    element={
                      canAddProduct ? (
                        <AddProduct token={token} />
                      ) : canListProducts ? (
                        <Navigate to="/list" replace />
                      ) : canManageOrders ? (
                        <Navigate to="/orders" replace />
                      ) : isSuperAdmin ? (
                        <Navigate to="/staff" replace />
                      ) : (
                        <AccessDenied featureName="Product Management" />
                      )
                    }
                  />
                  <Route
                    path="/list"
                    element={
                      canListProducts ? (
                        <ListProduct token={token} />
                      ) : (
                        <AccessDenied featureName="Product Listings" />
                      )
                    }
                  />
                  <Route
                    path="/orders"
                    element={
                      canManageOrders ? (
                        <OrderList token={token} />
                      ) : (
                        <AccessDenied featureName="Order Management" />
                      )
                    }
                  />
                  <Route
                    path="/staff"
                    element={
                      isSuperAdmin ? (
                        <AdminManagement token={token} currentAdmin={adminData} />
                      ) : (
                        <AccessDenied featureName="Staff Management" />
                      )
                    }
                  />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <Login setToken={setToken} setTokenAdmin={setTokenAdmin} setAdminData={setAdminData} />
        )}
      </div>
    </div>
  );
};

export default App;