import express from 'express';
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
  getFeaturedProducts,
  getCategories
} from '../controllers/productController.js';

const router = express.Router();

// Product routes
router.get('/', getAllProducts);
router.get('/featured/list', getFeaturedProducts);
router.get('/categories/list', getCategories);
router.get('/search/:query', searchProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);

export default router;