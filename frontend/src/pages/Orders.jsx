import React, { useContext, useEffect, useState } from 'react';
import { shopContext } from '../context/ShopContext';
import Title from '../component/Title';
import axios from 'axios';
import { backend_API } from '../config';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Orders = () => {
  const { currency } = useContext(shopContext);
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backend_API}/api/order/userorders`);
      if (res.data?.orders?.length > 0) {
        let orders = [];
        res.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            orders.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
              orderId: order._id,
            });
          });
        });
        setOrdersData(orders.reverse());
      } else {
        setOrdersData([]);
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const getStatusBadge = (status) => {
    const s = (status || "").toLowerCase();
    if (s.includes("delivered")) {
      return {
        bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
        dot: "bg-emerald-500",
      };
    }
    if (s.includes("shipped") || s.includes("out for delivery")) {
      return {
        bg: "bg-blue-50 text-blue-700 border-blue-200",
        dot: "bg-blue-500",
      };
    }
    return {
      bg: "bg-amber-50 text-amber-800 border-amber-200",
      dot: "bg-amber-500 animate-pulse",
    };
  };

  return (
    <div className="pt-8 pb-20">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <Title text1="MY" text2="ORDERS" />
          <p className="text-xs text-gray-400 mt-1">Track and manage your recent purchases</p>
        </div>
        <button
          type="button"
          onClick={() => {
            loadOrders();
            toast.info("Refreshed orders!");
          }}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition cursor-pointer"
        >
          {loading ? "Refreshing..." : "↻ Refresh Orders"}
        </button>
      </div>

      {ordersData.length === 0 ? (
        <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200 p-8 max-w-lg mx-auto">
          <div className="text-5xl mb-4">📦</div>
          <h3 className="text-xl font-bold text-gray-800">No orders placed yet</h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1.5 mb-6">
            When you purchase items, your order history and tracking details will appear here.
          </p>
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-800 text-white font-medium text-sm rounded-2xl shadow-md transition cursor-pointer"
          >
            <span>Explore Products</span>
            <span>→</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {ordersData.map((item, index) => {
            const badge = getStatusBadge(item.status);
            return (
              <div
                key={index}
                className="p-5 bg-white border border-gray-100 rounded-2xl shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xs transition"
              >
                {/* Product Info */}
                <div className="flex items-start gap-4 sm:gap-6">
                  <img
                    src={item.image}
                    className="w-20 h-24 object-cover object-top rounded-xl bg-gray-50 shrink-0 border border-gray-100"
                    alt={item.productname}
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                      {item.productname}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs sm:text-sm text-gray-600">
                      <span className="font-bold text-gray-900 text-base">
                        {currency || "₹"}{item.price}
                      </span>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md font-semibold text-xs border border-gray-200">
                        Size: {item.size}
                      </span>
                      <span>Qty: {item.quantity}</span>
                      <span className="text-gray-400">|</span>
                      <span className="uppercase text-[11px] font-semibold text-gray-500">
                        Payment: {item.paymentMethod || "COD"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Order Date:{" "}
                      <span className="text-gray-600 font-medium">
                        {new Date(item.date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center justify-between md:justify-end gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${badge.bg}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${badge.dot}`}></span>
                    <span>{item.status || "Order Placed"}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toast.info(`Order Status: ${item.status || "In Process"}. Estimated delivery in 2-4 business days.`)}
                    className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-xl text-xs font-semibold transition cursor-pointer shadow-2xs"
                  >
                    Track Order
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default Orders;