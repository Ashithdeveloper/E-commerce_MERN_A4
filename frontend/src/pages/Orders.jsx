import React from 'react'
import { shopContext } from '../context/ShopContext';
import { useContext } from 'react';
import Title from '../component/Title';
import { useState } from 'react';
import axios from 'axios';
import { backend_API } from '../config';
import { useEffect } from 'react';

const Orders = () => {
  const { currency  } = useContext(shopContext);
  const [  OrdersData , setOrdersdata] = useState([]);
  const loadOrders = async () => {
    try {
      const res = await axios.get(`${backend_API}/api/order/userorders`);
      console.log(res.data);
      if(res.data.orders.length > 0){
        let orders = [];
        res.data.orders.map((order) =>{
          order.items.map((item)=>{
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            orders.push(item);
          })
        })
        console.log(orders);
        setOrdersdata(orders.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    loadOrders();
  },[])
  return (
    <div className='border-t pt-16'>
      <div className='text-2x1`'>
        <Title text1="My" text2="Orders" />
      </div>
      <div>
        {
          OrdersData.map((item , index)=>{
            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 "
              >
                <div className="flex items-start gap-6 text-sm">
                  <img
                    src={item.image}
                    className="w-20 h-20 object-cover"
                    alt=""
                  />
                  <div>
                    <p className="sm:text-base font-medium">
                      {item.productname}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                      <p className="text-lg">
                        {currency}
                        {item.price}
                      </p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Size : {item.size}</p>
                    </div>
                    <p className="mt-2">
                      Date:{" "}
                      <span className="text-gray-400">
                        {new Date(item.date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-between">
                  <div className="flex items-center gap-2">
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p className="text-sm text-gray-500 md:text-base">
                      {item.status}
                    </p>
                  </div>
                  <button onClick={loadOrders} className="border px-4 py-2 text-sm font-medium rounded-sm">
                    Track Order
                  </button>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  )
}

export default Orders