import React, { useContext } from 'react';
import { shopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(shopContext);

  const imgSrc = Array.isArray(image) && image.length > 0 ? image[0] : image;

  return (
    <Link
      to={`/product/${id}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
        <img
          src={imgSrc}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      {/* Product Details */}
      <div className="p-3.5 sm:p-4">
        <h3 className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-black transition">
          {name}
        </h3>
        <div className="mt-1.5 flex items-center justify-between">
          <p className="text-sm sm:text-base font-bold text-gray-900">
            {currency || "₹"}{price}
          </p>
          <span className="text-[11px] font-semibold text-gray-400 group-hover:text-black transition">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;