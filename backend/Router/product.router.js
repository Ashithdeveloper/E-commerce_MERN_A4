import express from "express";
import { createProduct, deleteProduct, getAllProduct, getOneProduct, searchProducts, updateProduct } from "../controller/product.controller.js";
import upload from "../middleWare/upload.js";
import adminMiddleware from "../middleWare/adminMiddleware.js";


const router = express.Router();

//Image Upload controlls function
const uploadFields = upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 },
]);

//Admin Product router
router.post("/create",adminMiddleware ,uploadFields,createProduct);
router.delete("/delete/:id",adminMiddleware ,deleteProduct);
router.put("/update/:id", adminMiddleware,uploadFields, updateProduct);


//userProduct router
router.get("/getOne/:id", getOneProduct);
router.get("/getallproducts", getAllProduct);
router.get("/search" , searchProducts);

export default router