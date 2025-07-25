import expreess from "express";
import { AdminLogin, getAdmin, getUser, Login, logout, signup } from "../controller/auth.controller.js";
import userMiddleWare from "../middleWare/UserMiddleware.js";
import adminMiddleware from "../middleWare/adminMiddleware.js";

const router = expreess.Router();

router.post("/signup",signup )
router.post("/login",Login )
router.post("/logout",userMiddleWare,logout )
router.get("/getme", userMiddleWare,getUser )
router.post("/admin",AdminLogin)
router.get("/getadmin", adminMiddleware, getAdmin);


export default router