import { Router } from 'express';
import {createOrder, getUserOrders,getOrderById,cancelOrder} from "../controllers/order.controller.js";
import authenticateToken from "../middlewares/auth.middleware.js";


const router = Router();


router.post('/orders',authenticateToken, createOrder);
router.get('/orders', authenticateToken, getUserOrders);
router.get('/orders/:id', authenticateToken, getOrderById);
router.patch('/orders/:id',authenticateToken,cancelOrder);

export default router;