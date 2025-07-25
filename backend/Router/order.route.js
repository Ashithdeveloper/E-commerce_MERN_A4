import express from 'express';
import userMiddleWare from '../middleWare/UserMiddleware.js';
import { createOrder, getAllOrders, getUserOrders, updateOrder } from '../controller/order.controller.js';
import adminMiddleware from '../middleWare/adminMiddleware.js';


const router = express.Router();
//userOrder
router.post('/ordercod', userMiddleWare, createOrder );
// router.post('/orderrazor', userMiddleWare, createRazorOrder);
// router.post('/stripeorder', userMiddleWare, createStripeOrder);
router.get("/userorders", userMiddleWare, getUserOrders);

//admin 
router.get('/getallorder' , adminMiddleware , getAllOrders);
router.put('/updateorder', adminMiddleware, updateOrder);


export default router