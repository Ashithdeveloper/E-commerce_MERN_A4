import express from "express";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import authRouter from "./Router/auth.router.js";
import cors from "cors";
import productRouter from "./Router/product.router.js";
import cartRouter from "./Router/cart.route.js";
import orderRouter from './Router/order.route.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter); 
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
