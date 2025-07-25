import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // refer to actual 
    ref: "User",
    required: true,
  },
  items: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      productname: { type: String, required: true },
      image: { type: String },
      price: { type: Number, required: true },
      size: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  address: {
    firstName: String,
    lastName: String,
    email: String,
    country: String,
    state: String,
    district: String,
    pincode: String,
    address: String,
    phone: String,
  },
  status: {
    type: String,
    default: "Order Placed", 
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  payment: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.order || mongoose.model("order", orderSchema);
export default Order;
