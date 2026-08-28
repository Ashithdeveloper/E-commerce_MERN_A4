import React, { useEffect, useState, useContext } from "react";
import Title from "../component/Title";
import CartTotal from "../component/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { shopContext } from "../context/ShopContext";
import axios from "axios";
import { backend_API } from "../config";
import { toast } from "react-toastify";
import District from "../component/district/District";

const Placeorder = () => {
  const [placeData, setPlaceData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "India",
    state: "",
    district: "",
    pincode: "",
    address: "",
    phone: "",
  });
  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const {
    navigate,
    cartData,
    setCartData,
    totalProductPrice,
    delivery_fee,
    showCartsData,
  } = useContext(shopContext);

  const indiaData = {
    name: "India",
    states: [
      "Tamil Nadu",
      "Andaman and Nicobar Islands",
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chandigarh",
      "Chhattisgarh",
      "Dadra and Nagar Haveli and Daman and Diu",
      "Delhi",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jammu and Kashmir",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Ladakh",
      "Lakshadweep",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Puducherry",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
    ],
  };

  const [districtData, setDistrictData] = useState([]);

  useEffect(() => {
    const selected = District.states?.find(
      (item) => item.state === placeData.state
    );
    setDistrictData(selected ? selected.districts : []);
  }, [placeData.state]);

  const orderData = (e) => {
    const { name, value } = e.target;
    setPlaceData((prev) => ({ ...prev, [name]: value }));
  };

  const submitData = async (e) => {
    e.preventDefault();
    if (!placeData.firstName || !placeData.email || !placeData.state || !placeData.address || !placeData.phone) {
      toast.warning("Please fill in all required delivery fields.");
      return;
    }

    if (!cartData || cartData.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setLoading(true);
    try {
      let orderItems = [];

      cartData.forEach((item) => {
        Object.entries(item.sizes || {}).forEach(([size, quantity]) => {
          if (quantity > 0) {
            const itemInfo = {
              _id: item._id,
              productname: item.productname,
              image: Array.isArray(item.image) ? item.image[0] : item.image,
              price: item.price,
              size,
              quantity,
            };
            orderItems.push(itemInfo);
          }
        });
      });

      const payload = {
        items: orderItems,
        amount: totalProductPrice + (delivery_fee || 0),
        address: placeData,
        paymentMethod: method,
      };

      if (method === "cod") {
        const res = await axios.post(`${backend_API}/api/order/ordercod`, payload);
        if (res.data) {
          setCartData([]);
          if (showCartsData) showCartsData();
          toast.success(res.data.message || "Order placed successfully!");
          navigate("/orders");
        } else {
          toast.error(res.data?.message || "Failed to place order.");
        }
      } else {
        toast.info(`${method.toUpperCase()} payment gateway integration is in sandbox mode. Switching to COD.`);
        setMethod("cod");
      }
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error(error.response?.data?.message || "Something went wrong while placing your order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-8 pb-20">
      <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-14">
        
        {/* Left: Delivery Information Form */}
        <div className="flex-1">
          <div className="mb-6">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
            <p className="text-xs text-gray-400 mt-1">Please enter your shipping address</p>
          </div>

          <form onSubmit={submitData} className="space-y-4 max-w-xl">
            
            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  onChange={orderData}
                  value={placeData.firstName}
                  placeholder="e.g. John"
                  className="w-full px-4 py-2.5 bg-gray-50/60 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  onChange={orderData}
                  value={placeData.lastName}
                  placeholder="e.g. Doe"
                  className="w-full px-4 py-2.5 bg-gray-50/60 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  onChange={orderData}
                  value={placeData.email}
                  placeholder="e.g. john@example.com"
                  className="w-full px-4 py-2.5 bg-gray-50/60 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  onChange={orderData}
                  value={placeData.phone}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-4 py-2.5 bg-gray-50/60 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Street Address *</label>
              <input
                type="text"
                name="address"
                required
                onChange={orderData}
                value={placeData.address}
                placeholder="House / Flat No., Apartment, Landmark"
                className="w-full px-4 py-2.5 bg-gray-50/60 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition"
              />
            </div>

            {/* State & District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">State *</label>
                <select
                  name="state"
                  required
                  onChange={orderData}
                  value={placeData.state}
                  className="w-full px-4 py-2.5 bg-gray-50/60 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition cursor-pointer"
                >
                  <option value="">Select State</option>
                  {indiaData.states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">District / City</label>
                <select
                  name="district"
                  onChange={orderData}
                  value={placeData.district}
                  className="w-full px-4 py-2.5 bg-gray-50/60 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition cursor-pointer"
                >
                  <option value="">Select District</option>
                  {districtData.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Country & Pincode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Country</label>
                <input
                  type="text"
                  name="country"
                  value={placeData.country}
                  readOnly
                  className="w-full px-4 py-2.5 bg-gray-100/70 border border-gray-200 rounded-xl text-sm text-gray-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">PIN Code *</label>
                <input
                  type="text"
                  name="pincode"
                  required
                  onChange={orderData}
                  value={placeData.pincode}
                  placeholder="e.g. 600001"
                  className="w-full px-4 py-2.5 bg-gray-50/60 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition"
                />
              </div>
            </div>

          </form>
        </div>

        {/* Right: Summary & Payment Selector */}
        <div className="w-full lg:w-[420px] shrink-0">
          
          <CartTotal />

          {/* Payment Method Selector */}
          <div className="mt-8">
            <div className="mb-4">
              <Title text1={"PAYMENT"} text2={"METHOD"} />
            </div>

            <div className="grid grid-cols-1 gap-3">
              
              {/* Stripe */}
              <div
                onClick={() => setMethod("stripe")}
                className={`flex items-center justify-between p-3.5 border rounded-2xl cursor-pointer transition ${
                  method === "stripe"
                    ? "border-black bg-black/5 shadow-xs"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      method === "stripe" ? "border-black bg-black" : "border-gray-400"
                    }`}
                  >
                    {method === "stripe" && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                  </div>
                  <span className="text-xs font-semibold text-gray-800">Credit / Debit Card</span>
                </div>
                <img className="h-5" src={assets.stripe_logo} alt="Stripe" />
              </div>

              {/* Razorpay */}
              <div
                onClick={() => setMethod("razorpay")}
                className={`flex items-center justify-between p-3.5 border rounded-2xl cursor-pointer transition ${
                  method === "razorpay"
                    ? "border-black bg-black/5 shadow-xs"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      method === "razorpay" ? "border-black bg-black" : "border-gray-400"
                    }`}
                  >
                    {method === "razorpay" && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                  </div>
                  <span className="text-xs font-semibold text-gray-800">UPI / NetBanking</span>
                </div>
                <img className="h-5" src={assets.razorpay_logo} alt="Razorpay" />
              </div>

              {/* Cash On Delivery */}
              <div
                onClick={() => setMethod("cod")}
                className={`flex items-center justify-between p-3.5 border rounded-2xl cursor-pointer transition ${
                  method === "cod"
                    ? "border-black bg-black/5 shadow-xs"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      method === "cod" ? "border-black bg-black" : "border-gray-400"
                    }`}
                  >
                    {method === "cod" && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                  </div>
                  <span className="text-xs font-semibold text-gray-800">Cash on Delivery (COD)</span>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Recommended
                </span>
              </div>

            </div>

            {/* Place Order CTA */}
            <button
              type="button"
              disabled={loading}
              onClick={submitData}
              className="w-full mt-6 py-3.5 px-6 bg-black hover:bg-gray-800 text-white font-medium text-sm rounded-2xl shadow-lg hover:shadow-xl transition active:scale-[0.98] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Placing Order...</span>
              ) : (
                <>
                  <span>CONFIRM & PLACE ORDER</span>
                  <span>→</span>
                </>
              )}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Placeorder;
