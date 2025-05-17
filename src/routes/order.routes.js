import { Router } from 'express';
import {createOrder, getUserOrders} from "../controllers/order.controller.js";
import authenticateToken from "../middlewares/auth.middleware.js";


const router = Router();


router.post('/orders',authenticateToken, createOrder);
router.get('/orders', authenticateToken, getUserOrders);

export default router;