import React, { useContext } from "react";
import Title from "../component/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../component/CartTotal";
import { backend_API } from "../config";
import axios from "axios";
import { toast } from "react-toastify";
import { shopContext } from "../context/ShopContext";

const Cart = () => {
  const { navigate, cartData, setCartData, showCartsData } =
    useContext(shopContext);

  const updateQuantity = async (productId, size, newQty) => {
    if (newQty < 1) return;
    try {
      await axios.put(`${backend_API}/api/cart/update`, {
        productId,
        size,
        quantity: newQty,
      });
      toast.success("Quantity updated successfully!");
      showCartsData();
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const handleQuantityChange = (productId, size, newQty) => {
    // Optimistically update local state
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

    // Send update to backend
    updateQuantity(productId, size, newQty);
  };

  //Remove the cart data from the cart
  const removeCart = async (productId, size) => {
    try {
      const response = await axios.delete(`${backend_API}/api/cart/delete`, {
        data: {
          productId,
          size,
        },
      });
      toast.success(response.data.message);
      showCartsData();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="Your" text2="Cart" />
      </div>

      {cartData.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
      ) : (
        <div>
          {cartData.map((product) =>
            Object.entries(product.sizes).map(([size, quantity]) => (
              <div
                key={`${product._id}-${size}`}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img
                    src={product.image[0]}
                    alt={product.productname}
                    className="w-16 sm:w-20"
                  />
                  <div>
                    <p className="text-xs sm:text-base font-medium">
                      {product.productname}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>₹{product.price}</p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                        {size}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mr-[10px]">
                  <p
                    className="cursor-pointer text-[30px]"
                    onClick={() => {
                      if (quantity > 1) {
                        handleQuantityChange(product._id, size, quantity - 1);
                      }
                    }}
                  >
                    -
                  </p>
                  <input
                    type="number"
                    min={1}
                    className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                    value={quantity}
                    readOnly
                  />
                  <p
                    className="cursor-pointer text-[30px]"
                    onClick={() =>
                      handleQuantityChange(product._id, size, quantity + 1)
                    }
                  >
                    +
                  </p>
                </div>

                <img
                  src={assets.bin_icon}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  alt="Delete"
                  title="Reduce by 1"
                  onClick={() => removeCart(product._id, size)}
                />
              </div>
            ))
          )}
        </div>
      )}

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-1/2">
          <CartTotal />
          <div
            className="w-full text-end"
            onClick={() => navigate("/placeorder")}
          >
            <button className="bg-black text-white text-sm px-8 py-3 my-8">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
