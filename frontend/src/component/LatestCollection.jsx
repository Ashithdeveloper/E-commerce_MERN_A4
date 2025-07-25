import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(shopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const latest = [...products].slice(0, 10); 
      setLatestProducts(latest);
    }
  }, [products]); 

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs md:text-base text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum aut
          distinctio, voluptate iure laudantium veniam nostrum voluptatem animi
          natus vitae alias non doloribus nisi qui laboriosam quia adipisci
          labore fugit.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 ">
        {latestProducts.map((product) => (
          <ProductItem
            key={product._id}
            id={product._id}
            image={product.image}
            name={product.productname}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
