import express from 'express';
import {
  processCheckout,
  getOrderHistory,
  getOrderById
} from '../controllers/checkoutController.js';

const router = express.Router();

// Checkout and order routes
router.post('/checkout', processCheckout);
router.get('/orders/:sessionId', getOrderHistory);
router.get('/orders/details/:orderId', getOrderById);

export default router;