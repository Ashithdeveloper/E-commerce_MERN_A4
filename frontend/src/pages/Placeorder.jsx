import React, { useEffect } from "react";
import Title from "../component/Title";
import CardTotal from "../component/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { useState } from "react";
import { useContext } from "react";
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
  const selected = District.states.find(
    (item) => item.state === placeData.state
  );
  setDistrictData(selected ? selected.districts : []);

}, [placeData.state]);
 

  const orderData = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setPlaceData((prev) => ({ ...prev, [name]: value }));
  };


  const submitData = async (e) => {
    e.preventDefault();
    if (!placeData.firstName || !placeData.email || !placeData.state) {
      alert("Please fill in all required fields.");
      return;
    }
    console.log("Submitted Data:", placeData);
    try {
      let orderItems = [];

      cartData.forEach((item) => {
        Object.entries(item.sizes).forEach(([size, quantity]) => {
          if (quantity > 0) {
            const itemInfo = {
              _id: item._id,
              productname: item.productname,
              image: item.image[0],
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
        amount: totalProductPrice + delivery_fee,
        address: placeData,
        paymentMethod: method,
      };
      console.log(payload);

      switch (method) {
        //API CALL switch
        case "cod":
          try {
            const res = await axios.post(
              `${backend_API}/api/order/ordercod`,
              payload
            );
            if (res.data) {
              setCartData([]);
              navigate("/orders");
              showCartsData();
              console.log(res.data);
              toast.success(res.data.message);
            } else {
              toast.error(res.data.message);
            }
          } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
          }
          break;
        case "razorpay":
          break;
        case "stripe":
          break;
      }

      setPlaceData({
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
    } catch (error) {
      console.log(error);
    }
  };
  const [method, setMethod] = useState("cod");

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t ">
      {/**left side */}
      <div className="flex flex-col gap-4 w-full sm:w-[480px]">
        <div className="text-x1 sm:text-2x1 my-3 ">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            name="firstName"
            onChange={orderData}
            value={placeData.firstName}
            placeholder="First Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            name="lastName"
            onChange={orderData}
            value={placeData.lastName}
            placeholder="Last Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="email"
          name="email"
          onChange={orderData}
          value={placeData.email}
          placeholder="Email"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />

        <div className="flex gap-3">
          <input
            type="text "
            placeholder="India"
            name="country"
            onChange={orderData}
            value={placeData.country}
            readOnly
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />

          <select
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            name="state"
            onChange={orderData}
            value={placeData.state}
          >
            <option value="">Select State</option>
            {indiaData.states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-3">
          <select
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={orderData}
            value={placeData.district}
          >
            <option value="">Select District</option>
            {districtData.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="pincode"
            onChange={orderData}
            value={placeData.pincode}
            placeholder="Pin Code"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="text"
          placeholder="Address"
          name="address"
          onChange={orderData}
          value={placeData.address}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          type="text"
          name="phone"
          onChange={orderData}
          value={placeData.phone}
          placeholder="Phone Number"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>
      {/**Right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CardTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/**payment method */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" && "bg-green-400"
                } `}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" && "bg-green-400"
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" && "bg-green-400"
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                Cash On Delivery
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              className="bg-black text-white px-16 py-3 text-sm"
              onClick={submitData}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placeorder;
