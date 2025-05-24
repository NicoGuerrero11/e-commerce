import { Router } from 'express';
import {
    createProduct,
    getAllProducts,
    getProductById,
    deleteProduct,
    updateProduct
} from "../controllers/product.controller.js";
import authenticateToken from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/role.middleware.js";

const router = Router();

router.post('/products',authenticateToken,isAdmin, createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.delete('/products/:id',authenticateToken,isAdmin, deleteProduct);
router.patch('/products/:id',authenticateToken,isAdmin, updateProduct);

export default router;