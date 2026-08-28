import expreess from "express";
import {
  AdminLogin,
  getAdmin,
  getUser,
  Login,
  logout,
  signup,
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
} from "../controller/auth.controller.js";
import userMiddleWare from "../middleWare/UserMiddleware.js";
import adminMiddleware, { requireSuperAdmin } from "../middleWare/adminMiddleware.js";

const router = expreess.Router();

router.post("/signup", signup);
router.post("/login", Login);
router.post("/logout", userMiddleWare, logout);
router.get("/getme", userMiddleWare, getUser);
router.post("/admin", AdminLogin);
router.get("/getadmin", adminMiddleware, getAdmin);

// Super Admin Staff Management routes
router.get("/staff", adminMiddleware, requireSuperAdmin, getAllStaff);
router.post("/staff", adminMiddleware, requireSuperAdmin, createStaff);
router.put("/staff/:id", adminMiddleware, requireSuperAdmin, updateStaff);
router.delete("/staff/:id", adminMiddleware, requireSuperAdmin, deleteStaff);

export default router;