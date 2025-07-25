import Order from "../model/order.model.js";
import User from "../model/auth.model.js";

//create order for cod
export const createOrder = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { items, amount, address, paymentMethod } = req.body;

    if (!userId || !items || !amount || !address || !paymentMethod) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const formattedItems = items.map((item) => ({
      _id: item._id,
      productname: item.productname,
      image: item.image,
      price: item.price,
      size: item.size.toUpperCase(),
      quantity: item.quantity,
    }));

    const order = new Order({
      userId,
      items: formattedItems,
      amount,
      address,
      paymentMethod,
      status: "Order Placed",
      payment: false,
      date: new Date(),
    });

    await order.save();
    const user = await User.findById(userId);
    if (user && user.cart) {
      items.forEach(({ _id, size }) => {
        const productId = String(_id);
        if (user.cart[productId] && user.cart[productId][size]) {
          delete user.cart[productId][size];

          if (Object.keys(user.cart[productId]).length === 0) {
            delete user.cart[productId];
          }
        }
      });
      user.markModified("cart");
      await user.save();
    }

    return res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//create order for razor payment
// export const createRazorOrder = async (req, res) => {};

//create order for stripe
// export const createStripeOrder = async (req, res) => {};


//admin orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
//user orders
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId });
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateOrder = async (req, res) => {
  try {
    const { orderId , status } = req.body;
    await Order.updateOne({ _id: orderId }, { status });
    res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

