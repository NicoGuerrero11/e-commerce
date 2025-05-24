import { Router } from 'express';
import {createOrder, getUserOrders,getOrderById,cancelOrder, getAllOrders, updateOrderStatus} from "../controllers/order.controller.js";
import authenticateToken from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/role.middleware.js";


const router = Router();

//user
router.post('/orders',authenticateToken, createOrder);
router.get('/orders', authenticateToken, getUserOrders);
router.get('/orders/:id', authenticateToken, getOrderById);
router.patch('/orders/:id',authenticateToken,cancelOrder);

//admin
router.get('/admin/orders', authenticateToken,isAdmin, getAllOrders);
router.patch('/admin/orders/:id/status', authenticateToken,isAdmin, updateOrderStatus);

export default router;