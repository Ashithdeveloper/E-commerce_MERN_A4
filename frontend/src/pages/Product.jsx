import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { shopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProduct from '../component/RelatedProduct';
import { toast } from 'react-toastify';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCard } = useContext(shopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  const fetchProduct = () => {
    if (products && products.length > 0) {
      const item = products.find((p) => p._id === productId);
      if (item) {
        setProductData(item);
        setImage(item.image[0]);
      }
    }
  };

  useEffect(() => {
    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [products, productId]);

  const handleAddToCart = () => {
    if (!size) {
      toast.warning("Please select a size first!");
      return;
    }
    addToCard(productData._id, size);
  };

  if (!productData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="pt-8 pb-16">
      
      {/* Product Main Showcase */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
        
        {/* Left: Gallery */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-4">
          
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-24 shrink-0">
            {productData.image.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setImage(item)}
                className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  image === item
                    ? "border-black shadow-md scale-95"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img src={item} alt="" className="w-full h-full object-cover object-top" />
              </button>
            ))}
          </div>

          {/* Main High-Res Image */}
          <div className="flex-1 aspect-[3/4] bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-xs">
            <img
              src={image}
              alt={productData.productname}
              className="w-full h-full object-cover object-top transition duration-500"
            />
          </div>

        </div>

        {/* Right: Product Info */}
        <div className="flex-1 flex flex-col justify-start">
          
          {productData.bestseller && (
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider w-max mb-3">
              ★ Bestseller
            </span>
          )}

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {productData.productname}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1 text-amber-500 text-sm">
              <img src={assets.star_icon} alt="" className="w-4 h-4" />
              <img src={assets.star_icon} alt="" className="w-4 h-4" />
              <img src={assets.star_icon} alt="" className="w-4 h-4" />
              <img src={assets.star_icon} alt="" className="w-4 h-4" />
              <img src={assets.star_dull_icon} alt="" className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-gray-500">(122 verified reviews)</span>
          </div>

          {/* Price */}
          <div className="mt-5">
            <p className="text-3xl font-bold text-gray-900">
              {currency || "₹"}{productData.price}
            </p>
            <p className="text-xs text-emerald-600 font-semibold mt-1">Inclusive of all taxes</p>
          </div>

          <p className="mt-4 text-sm text-gray-600 leading-relaxed max-w-lg">
            {productData.description}
          </p>

          {/* Size Selector */}
          <div className="my-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Select Size
              </label>
              <span className="text-xs text-gray-400">Size Chart ↗</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSize(item)}
                  className={`min-w-[48px] h-11 px-4 text-sm font-semibold rounded-xl border transition-all cursor-pointer ${
                    size === item
                      ? "bg-black text-white border-black shadow-sm"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="flex gap-4 max-w-md">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 py-3.5 px-8 bg-black hover:bg-gray-800 text-white font-medium text-sm rounded-2xl shadow-lg hover:shadow-xl transition active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <img src={assets.cart_icon} alt="" className="w-4 h-4 invert" />
              ADD TO CART
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl">
              <span>✨</span>
              <span className="font-medium">100% Original</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl">
              <span>💵</span>
              <span className="font-medium">COD Available</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl">
              <span>🔄</span>
              <span className="font-medium">7 Days Return</span>
            </div>
          </div>

        </div>

      </div>

      {/* Description & Reviews Tabs */}
      <div className="mt-16 bg-white rounded-3xl border border-gray-100 shadow-2xs overflow-hidden">
        <div className="flex border-b border-gray-100 bg-gray-50/50">
          <button
            type="button"
            onClick={() => setActiveTab("description")}
            className={`py-3.5 px-6 text-xs sm:text-sm font-bold tracking-wider uppercase transition cursor-pointer ${
              activeTab === "description"
                ? "bg-white text-black border-b-2 border-black"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            Product Description
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={`py-3.5 px-6 text-xs sm:text-sm font-bold tracking-wider uppercase transition cursor-pointer ${
              activeTab === "reviews"
                ? "bg-white text-black border-b-2 border-black"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            Customer Reviews (122)
          </button>
        </div>

        <div className="p-6 sm:p-8 text-sm text-gray-600 leading-relaxed">
          {activeTab === "description" ? (
            <div className="space-y-3">
              <p>
                Crafted with attention to detail and premium textiles, this garment offers exceptional comfort, enduring shape retention, and versatile everyday styling.
              </p>
              <p>
                <strong>Care Instructions:</strong> Machine wash cold with like colors. Do not bleach. Tumble dry low or hang dry in shade.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-gray-900 text-xs">Alex P.</span>
                  <span className="text-amber-500 text-xs">★★★★★</span>
                </div>
                <p className="text-xs text-gray-600">Great quality! The fit is true to size and the fabric feels extremely soft.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-gray-900 text-xs">Sarah M.</span>
                  <span className="text-amber-500 text-xs">★★★★★</span>
                </div>
                <p className="text-xs text-gray-600">Ordered standard shipping and received it within 2 days. Highly recommended!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <RelatedProduct
        category={productData.category}
        subCategory={productData.subcategory || productData.subCategory}
      />

    </div>
  );
};

export default Product;