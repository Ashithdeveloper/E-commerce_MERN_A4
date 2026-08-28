import React, { useContext } from "react";
import Title from "../component/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../component/CartTotal";
import { backend_API } from "../config";
import axios from "axios";
import { toast } from "react-toastify";
import { shopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { navigate, cartData, setCartData, showCartsData, currency } =
    useContext(shopContext);

  const updateQuantity = async (productId, size, newQty) => {
    if (newQty < 1) return;
    try {
      await axios.put(`${backend_API}/api/cart/update`, {
        productId,
        size,
        quantity: newQty,
      });
      toast.success("Quantity updated!");
      showCartsData();
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const handleQuantityChange = (productId, size, newQty) => {
    setCartData((prev) =>
      prev.map((product) => {
        if (product._id === productId) {
          return {
            ...product,
            sizes: {
              ...product.sizes,
              [size]: newQty,
            },
          };
        }
        return product;
      })
    );
    updateQuantity(productId, size, newQty);
  };

  const removeCart = async (productId, size) => {
    try {
      const response = await axios.delete(`${backend_API}/api/cart/delete`, {
        data: {
          productId,
          size,
        },
      });
      toast.success(response.data.message || "Item removed from cart");
      showCartsData();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to remove item");
    }
  };

  const totalItemsCount = cartData.reduce((acc, product) => {
    return acc + Object.values(product.sizes || {}).reduce((sAcc, q) => sAcc + q, 0);
  }, 0);

  return (
    <div className="pt-8 pb-16">
      
      {/* Title */}
      <div className="mb-8">
        <Title text1="SHOPPING" text2="BAG" />
        <p className="text-xs text-gray-400 mt-1">
          {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      {cartData.length === 0 ? (
        <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200 p-8 max-w-lg mx-auto">
          <div className="text-5xl mb-4">🛍️</div>
          <h3 className="text-xl font-bold text-gray-800">Your shopping bag is empty</h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1.5 mb-6">
            Looks like you haven't added anything to your cart yet. Explore our latest styles now!
          </p>
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-800 text-white font-medium text-sm rounded-2xl shadow-md transition cursor-pointer"
          >
            <span>Start Shopping</span>
            <span>→</span>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
          
          {/* Cart Items List */}
          <div className="flex-1 w-full space-y-4">
            {cartData.map((product) =>
              Object.entries(product.sizes || {}).map(([size, quantity]) => (
                <div
                  key={`${product._id}-${size}`}
                  className="p-4 sm:p-5 bg-white border border-gray-100 rounded-2xl shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:shadow-xs"
                >
                  
                  {/* Left: Product Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={Array.isArray(product.image) ? product.image[0] : product.image}
                      alt={product.productname}
                      className="w-20 h-24 object-cover object-top rounded-xl bg-gray-50 shrink-0 border border-gray-100"
                    />
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1">
                        {product.productname}
                      </h4>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-sm sm:text-base font-bold text-gray-900">
                          {currency || "₹"}{product.price}
                        </span>
                        <span className="px-2.5 py-0.5 text-xs font-semibold text-gray-700 bg-gray-100 rounded-md border border-gray-200">
                          Size: {size}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Quantity Controls & Delete */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    
                    {/* Quantity Pill */}
                    <div className="flex items-center bg-gray-100/80 rounded-xl p-1 border border-gray-200/60">
                      <button
                        type="button"
                        onClick={() => {
                          if (quantity > 1) {
                            handleQuantityChange(product._id, size, quantity - 1);
                          }
                        }}
                        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-black hover:bg-white rounded-lg transition cursor-pointer font-bold text-sm"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-gray-900">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange(product._id, size, quantity + 1)
                        }
                        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-black hover:bg-white rounded-lg transition cursor-pointer font-bold text-sm"
                      >
                        +
                      </button>
                    </div>

                    {/* Delete Item */}
                    <button
                      type="button"
                      onClick={() => removeCart(product._id, size)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
                      title="Remove item"
                    >
                      <img src={assets.bin_icon} className="w-4 h-4" alt="Delete" />
                    </button>

                  </div>

                </div>
              ))
            )}
          </div>

          {/* Checkout & Summary Sidebar */}
          <div className="w-full lg:w-96 shrink-0 sticky top-24">
            <CartTotal />
            <button
              type="button"
              onClick={() => navigate("/placeorder")}
              className="w-full mt-4 py-3.5 px-6 bg-black hover:bg-gray-800 text-white font-medium text-sm rounded-2xl shadow-lg hover:shadow-xl transition active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <span>PROCEED TO CHECKOUT</span>
              <span>→</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

export default Cart;
