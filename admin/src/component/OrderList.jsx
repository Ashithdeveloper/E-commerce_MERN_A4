import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { backendurl, currency } from "../config";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";
import { FaBars } from "react-icons/fa6";
import Loading from "./Loading";

const OrderList = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showSidebar, setShowSidebar] = useState(false);
  const [ orderLoading, setOrderLoading ] = useState(false);

  //Get all orders by API
  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    } else {
      try {
        setOrderLoading(true);
        const res = await axios.get(
          `${backendurl}/api/order/getallorder`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.orders !== null) {
          const allOrders = res.data.orders.reverse();
          setOrders(allOrders);
          filterStatus(selectedStatus, allOrders);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    setOrderLoading(false);
  };
  //Update status
  const statusHandle = async (e, orderId) => {
    try {
      const res = await axios.put(
        `${backendurl}/api/order/updateorder`,
        {
          orderId,
          status: e.target.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message);
      await fetchAllOrders();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  //Get all orders
  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  //Apply filter for Status
  const filterStatus = (status, data = orders) => {
    setSelectedStatus(status);
    if (status === "All") {
      setFilteredOrders(data);
    } else {
      const filtered = data.filter((order) => order.status === status);
      setFilteredOrders(filtered);
    }
  };

  return (
    <div>
      {orderLoading ? (
        <Loading />
      ) : (
        <>
          <div className="md:flex gap-3 justify-between font-bold cursor-pointer hidden ">
            <h4
              className={`${
                selectedStatus === "All"
                  ? "text-green-600 text-[18px] scale-110 transition ease-in-out "
                  : ""
              }`}
              onClick={() => filterStatus("All")}
            >
              All
            </h4>
            <h4
              className={`${
                selectedStatus === "Order Placed"
                  ? "text-green-600 text-[18px] scale-110 transition ease-in-out"
                  : ""
              }`}
              onClick={() => filterStatus("Order Placed")}
            >
              Order Placed
            </h4>

            <h4
              className={`${
                selectedStatus === "Packing"
                  ? "text-green-600 text-[18px] scale-110 transition ease-in-out"
                  : ""
              }`}
              onClick={() => filterStatus("Packing")}
            >
              Packing
            </h4>
            <h4
              className={`${
                selectedStatus === "Shipped"
                  ? "text-green-600 text-[18px] scale-110 transition ease-in-out"
                  : ""
              }`}
              onClick={() => filterStatus("Shipped")}
            >
              Shipped
            </h4>
            <h4
              className={`${
                selectedStatus === "Out for delivery"
                  ? "text-green-600 text-[18px] scale-110 transition ease-in-out"
                  : ""
              }`}
              onClick={() => filterStatus("Out for delivery")}
            >
              Out for Delivery
            </h4>
            <h4
              className={`${
                selectedStatus === "Delivered"
                  ? "text-green-600 text-[18px] scale-110 transition ease-in-out"
                  : ""
              }`}
              onClick={() => filterStatus("Delivered")}
            >
              Delivered
            </h4>
          </div>
          {/**Mobile screen */}
          <div className="md:hidden block">
            <div className="text-[25px]">
              {showSidebar ? (
                <p
                  className="cursor-pointer text-2xl"
                  onClick={() => setShowSidebar(!showSidebar)}
                >
                  {" "}
                  X
                </p>
              ) : (
                <FaBars
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="cursor-pointer"
                />
              )}
            </div>
            {showSidebar && (
              <div className="flex flex-col gap-5 font-bold cursor-pointer bg-gray-300 px-5 py-2">
                <h4
                  className={`${
                    selectedStatus === "All"
                      ? "text-green-600 text-[18px] scale-110 transition ease-in-out "
                      : ""
                  }`}
                  onClick={() => filterStatus("All")}
                >
                  All
                </h4>
                <h4
                  className={`${
                    selectedStatus === "Order Placed"
                      ? "text-green-600 text-[18px] scale-110 transition ease-in-out"
                      : ""
                  }`}
                  onClick={() => filterStatus("Order Placed")}
                >
                  Order Placed
                </h4>

                <h4
                  className={`${
                    selectedStatus === "Packing"
                      ? "text-green-600 text-[18px] scale-110 transition ease-in-out"
                      : ""
                  }`}
                  onClick={() => filterStatus("Packing")}
                >
                  Packing
                </h4>
                <h4
                  className={`${
                    selectedStatus === "Shipped"
                      ? "text-green-600 text-[18px] scale-110 transition ease-in-out"
                      : ""
                  }`}
                  onClick={() => filterStatus("Shipped")}
                >
                  Shipped
                </h4>
                <h4
                  className={`${
                    selectedStatus === "Out for delivery"
                      ? "text-green-600 text-[18px] scale-110 transition ease-in-out"
                      : ""
                  }`}
                  onClick={() => filterStatus("Out for delivery")}
                >
                  Out for Delivery
                </h4>
                <h4
                  className={`${
                    selectedStatus === "Delivered"
                      ? "text-green-600 text-[18px] scale-110 transition ease-in-out"
                      : ""
                  }`}
                  onClick={() => filterStatus("Delivered")}
                >
                  Delivered
                </h4>
              </div>
            )}
          </div>
          {/**order list */}
          <div>
            {filteredOrders.map((order, index) => (
              <div
                className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
                key={index}
              >
                <img className="w-12" src={assets.parcel_icon} alt="" />
                <div>
                  <div>
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return (
                          <p className="py-0.5" key={index}>
                            {item.productname} X {item.quantity}
                            <span>{item.size}</span>
                          </p>
                        );
                      } else {
                        return (
                          <p className="py-0.5" key={index}>
                            {item.productname} X {item.quantity}
                            <span>{item.size}</span>,
                          </p>
                        );
                      }
                    })}
                  </div>
                  <p className="mt-3 mb-2 font-medium">
                    {order.address.firstName + " " + order.address.lastName}
                  </p>
                  <div>
                    <p>{order.address.address + ", "}</p>
                    <p>
                      {order.address.country +
                        ", " +
                        order.address.state +
                        ", " +
                        order.address.district +
                        "," +
                        order.address.pincode}
                    </p>
                  </div>
                  <p>{order.address.phone}</p>
                </div>
                <div>
                  <p className="text-sm sm:text-[15px]">
                    Items : {order.items.length}
                  </p>
                  <p className="mt-3">Method : {order.paymentMethod}</p>
                  <p>Payment : {order.payment ? "Paid" : "Unpaid"}</p>
                  <p>Date : {new Date(order.date).toDateString()}</p>
                </div>
                <p className="text-sm sm:text-[15px]">
                  {currency}
                  {order.amount}
                </p>
                <select
                  onChange={(e) => statusHandle(e, order._id)}
                  value={order.status}
                  className="p-2 font-semibold"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default OrderList;
