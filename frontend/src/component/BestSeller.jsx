import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const { products } = useContext(shopContext);
    const [ bestSellers , setBestSellers ] = useState([]);
     
    useEffect(()=>{
        const bestProduct = products.filter((item) => item.bestseller);
        setBestSellers(bestProduct.slice(0, 5));
    },[products])

  return (
    <div className="my-[-30px]">
      <div className="text-center py-8 text-3xl">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs md:text-base text-grap-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit,
          temporibus numquam! Pariatur qui, minima, deleniti quo laudantium
          blanditiis quasi fuga consequuntur sit ducimus odio dolor? Cupiditate
          accusamus corporis quibusdam inventore?
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            bestSellers.map((items , index)=>{
                return(
                    <ProductItem key={index} id={items._id} image={items.image} name={items.productname} price={items.price} />
                )
            })
        }
      </div>
    </div>
  );
}

export default BestSeller