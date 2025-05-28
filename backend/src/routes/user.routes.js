import { Router } from 'express';
import { getUsersProfile, updateUserProfile } from '../controllers/user.controller.js';
import { addAddress, updateAddress, deleteAddress, setDefaultAddress } from '../controllers/address.controller.js';
import authenticateToken from '../middlewares/auth.middleware.js';

const router = Router();

// User profile routes
router.get('/users/profile/:id', authenticateToken, getUsersProfile);
router.patch('/users/profile/:id', authenticateToken, updateUserProfile);

// Address routes
router.post('/users/profile/address', authenticateToken, addAddress);
router.patch('/users/profile/address/:addressId', authenticateToken, updateAddress);
router.delete('/users/profile/address/:addressId', authenticateToken, deleteAddress);
router.put('/users/profile/address/:addressId/default', authenticateToken, setDefaultAddress);

export default router;