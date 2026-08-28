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
    <section className="my-16">
      <div className="text-center pb-8">
        <Title text1={"LATEST"} text2={"DROPS"} />
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-gray-500 mt-2">
          Explore our newly arrived essentials, thoughtfully designed for every occasion with premium fabrics and comfort.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
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
    </section>
  );
};

export default LatestCollection;
