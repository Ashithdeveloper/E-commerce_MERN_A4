import React, { useContext, useEffect, useState } from 'react';
import { shopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(shopContext);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const bestProduct = products.filter((item) => item.bestseller);
      setBestSellers(bestProduct.slice(0, 5));
    }
  }, [products]);

  return (
    <section className="my-16">
      <div className="text-center pb-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-gray-500 mt-2">
          Customer favorites that define the season. Handpicked top-selling pieces loved for fit, quality, and style.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {bestSellers.map((items) => (
          <ProductItem
            key={items._id}
            id={items._id}
            image={items.image}
            name={items.productname}
            price={items.price}
          />
        ))}
      </div>
    </section>
  );
};

export default BestSeller;