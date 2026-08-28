import React, { useContext } from 'react';
import { shopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, totalProductPrice } = useContext(shopContext);

  const finalTotal = totalProductPrice === 0 ? 0 : totalProductPrice + (delivery_fee || 0);

  return (
    <div className="w-full bg-gray-50/80 p-6 sm:p-7 rounded-3xl border border-gray-100 shadow-2xs">
      <div className="mb-4">
        <Title text1={"ORDER"} text2={"SUMMARY"} />
      </div>
      <div className="flex flex-col gap-3 text-xs sm:text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-900">{currency || "₹"}{totalProductPrice}.00</span>
        </div>
        <div className="flex justify-between">
          <span>Estimated Shipping</span>
          <span className="font-semibold text-gray-900">
            {totalProductPrice === 0 ? "Free" : `${currency || "₹"}${delivery_fee || 0}.00`}
          </span>
        </div>
        <div className="pt-3 border-t border-gray-200 flex justify-between text-sm sm:text-base font-bold text-gray-900">
          <span>Total</span>
          <span className="text-lg">{currency || "₹"}{finalTotal}.00</span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;