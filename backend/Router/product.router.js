import express from "express";
import { createProduct, deleteProduct, getAllProduct, getOneProduct, searchProducts, updateProduct } from "../controller/product.controller.js";
import upload from "../middleWare/upload.js";
import adminMiddleware, { requirePermission } from "../middleWare/adminMiddleware.js";


const router = express.Router();

//Image Upload controlls function
const uploadFields = upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 },
]);

//Admin Product router
router.post("/create", adminMiddleware, requirePermission("addProduct"), uploadFields, createProduct);
router.delete("/delete/:id", adminMiddleware, requirePermission("listProducts"), deleteProduct);
router.put("/update/:id", adminMiddleware, requirePermission("addProduct"), uploadFields, updateProduct);


//userProduct router
router.get("/getOne/:id", getOneProduct);
router.get("/getallproducts", getAllProduct);
router.get("/search" , searchProducts);

export default router;