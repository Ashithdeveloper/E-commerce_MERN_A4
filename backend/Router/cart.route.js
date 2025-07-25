import express from "express";
import { getCart, addToCart, removeFromCart, updateQuantity } from "../controller/cart.controller.js";
import userMiddleWare from "../middleWare/UserMiddleware.js";

const router = express.Router();

router.post("/addtocart/:id",userMiddleWare ,addToCart);
router.get("/getCart",userMiddleWare, getCart);
router.delete("/delete", userMiddleWare,removeFromCart);
router.put("/update", userMiddleWare, updateQuantity);

export default router