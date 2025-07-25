import React, { useContext } from 'react'
import { shopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
    const { currency, delivery_fee, totalProductPrice } =
      useContext(shopContext);
  return (
    <div className='w-full'>
      <div className='text-2x1'>
        <Title text1={"TOTAL"} text2={"AMOUNT"} />
        <div className='flex flex-col gap-2 mt-2 text-sm'>
          <div className='flex justify-between'>
            <p>Subtotal</p> 
            <p>{currency} {totalProductPrice}.00</p>
          </div>
          <hr/>
          <div className='flex justify-between'>
            <p>Shipping Fee</p> 
            <p>{currency} {delivery_fee}.00</p>
          </div>
          <hr />
          <div className='flex justify-between'>
            <b>Total</b> 
            <b>{currency} { totalProductPrice === 0 ? 0  :  totalProductPrice + delivery_fee}.00</b>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartTotal