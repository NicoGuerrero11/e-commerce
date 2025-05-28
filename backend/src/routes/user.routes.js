import { Router } from 'express';
import { getUser, updateUser } from '../controllers/user.controller.js';
import { addAddress, updateAddress, deleteAddress, setDefaultAddress } from '../controllers/address.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

// User profile routes
router.get('/users/profile/:id', authenticateToken, getUser);
router.put('/users/profile/:id', authenticateToken, updateUser);

// Address routes
router.post('/users/profile/:id/address', authenticateToken, addAddress);
router.patch('/users/profile/:id/address/:addressId', authenticateToken, updateAddress);
router.delete('/users/profile/:id/address/:addressId', authenticateToken, deleteAddress);
router.put('/users/profile/:id/address/:addressId/default', authenticateToken, setDefaultAddress);

export default router;