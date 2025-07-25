
import User from "../model/auth.model.js";
import Product from "../model/product.model.js";

export const addToCart = async (req, res) => {
  try {
    const { sizes } = req.body;
    const { id } = req.params;
    const userId = req.user?.id;

    if (!sizes || !id || !userId) {
      return res
        .status(400)
        .json({ message: "Missing product ID, size or user ID" });
    }

    const sizeKey = typeof sizes === "string" ? sizes : String(sizes);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = { ...(user.cart || {}) };

    if (!cart[id]) cart[id] = {};
    cart[id][sizeKey] = (cart[id][sizeKey] || 0) + 1;

    user.cart = cart;
    user.markModified("cart"); 
    await user.save();

    res.status(200).json({ message: "Item added to cart", cart });
  } catch (err) {
    console.error("Add to cart failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user?.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = user.cart || {};
    const productIds = Object.keys(cart);

    const products = await Product.find({
      _id: { $in: productIds },
    });

    let totalQuantity = 0;
    let totalPrice = 0;

    // Map product info with quantity and sizes
    const cartItems = products.map((product) => {
      const sizesObj = cart[product._id.toString()];
      let productQuantity = 0;
      let productTotal = 0;

      for (const size in sizesObj) {
        const qty = sizesObj[size];
        productQuantity += qty;
        productTotal += qty * product.price;
      }

      totalQuantity += productQuantity;
      totalPrice += productTotal;

      return {
        _id: product._id,
        productname: product.productname,
        price: product.price,
        image: product.image,
        sizes: sizesObj,
        itemTotalQuantity: productQuantity,
        itemTotalPrice: productTotal,
      };
    });

    res.status(200).json({
      cart: cartItems,
      totalQuantity,
      totalPrice,
    });
  } catch (err) {
    console.error("Failed to get cart:", err);

    res.status(500).json({ message: "Server error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { productId, size } = req.body;

    if (!userId || !productId || !size) {
      return res.status(400).json({
        message: "User ID, product ID, and size are required.",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Ensure cart exists
    if (!user.cart || !user.cart[productId]) {
      return res.status(404).json({ message: "Item not found in cart." });
    }

    // Remove specific size
    delete user.cart[productId][size];

    // If no sizes left, remove product entry
    if (Object.keys(user.cart[productId]).length === 0) {
      delete user.cart[productId];
    }

    user.markModified("cart"); 
    await user.save();

    return res.status(200).json({ message: "Item removed from cart." });
  } catch (error) {
    console.error("removeFromCart error:", error);
    return res
      .status(500)
      .json({ message: "Server error while removing item." });
  }
};


 export const updateQuantity = async (req, res) => {
   try {
     const userId = req.user?.id;
     const { productId, size, quantity } = req.body;

     if (!productId || !size || quantity === undefined) {
       return res
         .status(400)
         .json({ message: "Product ID, size, and quantity are required." });
     }

     const user = await User.findById(userId);

     if (!user) {
       return res.status(404).json({ message: "User not found." });
     }

     if (!user.cart) {
       user.cart = {};
     }

     if (!user.cart[productId]) {
       user.cart[productId] = {};
     }

     if (quantity < 1) {
       delete user.cart[productId][size];

       if (Object.keys(user.cart[productId]).length === 0) {
         delete user.cart[productId];
       }
     } else {
       user.cart[productId][size] = quantity;
     }

     // ✅ Tell Mongoose to watch this object
     user.markModified("cart");

     await user.save();

     return res.status(200).json({ message: "Quantity updated successfully." });
   } catch (error) {
     console.error("updateQuantity error:", error);
     res.status(500).json({ message: "Internal server error." });
   }
 };